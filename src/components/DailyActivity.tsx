import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Github, Calendar, Brain, Code2, Database, Terminal, Layers, Globe, Cpu, Bot, GitBranch, PenTool, Coffee, Atom } from 'lucide-react';

const activities = [
  { icon: Github, name: 'GitHub', category: 'Tools' },
  { icon: Code2, name: 'VS Code', category: 'Tools' },
  { icon: PenTool, name: 'Cursor / Zed', category: 'Tools' },
  { icon: GitBranch, name: 'Git', category: 'Tools' },
  { icon: Terminal, name: 'Cursor', category: 'Tools' },
  { icon: Bot, name: 'Chat Gpt/Cloud', category: 'Tools' },
  { icon: Globe, name: 'Postman', category: 'Tools' },
  { icon: Calendar, name: 'Planner', category: 'Tools' },
  { icon: Brain, name: 'Memory Training', category: 'Tools' },
];

const technologies = [
  { icon: Code2, name: 'JavaScript/TypeScript', level: 85 },
  { icon: Cpu, name: 'C++', level: 85 },
  { icon: Coffee, name: 'Java', level: 80 },
  { icon: Terminal, name: 'Python', level: 80 },
  { icon: Atom, name: 'React/React Native', level: 75 },
  { icon: Database, name: 'SQL/NoSQL', level: 70 },
];

const Carousel3D = ({ items, direction = "left", speed = 20 }: { items: any[], direction?: "left" | "right", speed?: number }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemWidth = isMobile ? 220 : 300;
  const count = items.length;

  // Responsive radius
  // Mobile: tighter circle to fit screen
  // Desktop: wider ellipse
  const xRadius = isMobile
    ? Math.min(window.innerWidth / 2 - itemWidth / 2 - 20, 180) // Limit radius on mobile to fit screen
    : Math.max((count * itemWidth) / (2 * Math.PI) * 1.8, 600);

  // Adjust Z depth for mobile to be less "deep"
  const zRadius = isMobile ? xRadius * 0.8 : xRadius * 0.6;

  // Use a motion value for continuous rotation
  const rot = useMotionValue(0);

  // Animate the rotation
  useEffect(() => {
    // Direction multiplier: left = 1 (clockwise for items), right = -1
    // Actually, if we increase angle, sin/cos rotate one way. 
    // We want separate controls.
    const dir = direction === "left" ? -1 : 1;
    const duration = speed * 1000; // speed in seconds to ms? No typical speed is ~20s.

    // Simple loop
    const controls = animate(rot, 360 * dir, {
      duration: speed,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      // We need to accumulate rotation to avoid "rewind" if we just loop 0-360, 
      // but simpler: if we verify visual smoothness. 
      // FRAMER MOTION `repeat: Infinity` resets to 'from' value.
      // Smooth loop requires 0 and 360 to be identical positions.
      // 360 deg is 0 deg. So yes, it works.
    });

    return controls.stop;
  }, [direction, speed, rot]);

  return (
    <div className="relative flex justify-center items-center h-[350px] perspective-container overflow-hidden w-full">
      <div
        className="relative preserve-3d w-full h-full flex items-center justify-center"
      >
        {items.map((item, index) => {
          // Create a transform for each item dependent on 'rot'
          // We can't use standard React render for high-perf animation frame usually, 
          // but for <20 items it's okay? 
          // Better: Use `useTransform` for each item.

          const itemAngleOffset = (index / count) * 360;

          const transform = useTransform(rot, (currentRotation) => {
            const theta = (currentRotation + itemAngleOffset) * (Math.PI / 180);
            const x = xRadius * Math.sin(theta);
            const z = zRadius * Math.cos(theta);
            // We translate manually. No rotation applied to the div itself means it faces front.
            return `translate3d(${x}px, 0, ${z}px)`;
          });

          // Opacity/Scale based on Z for effect? 
          // Z is already handled by perspective, but to ensure "back" items are dimmed:
          const zRaw = useTransform(rot, (currentRotation) => {
            const theta = (currentRotation + itemAngleOffset) * (Math.PI / 180);
            return zRadius * Math.cos(theta);
          });
          const opacity = useTransform(zRaw, [-zRadius, zRadius], [0.5, 1]);
          const zIndex = useTransform(zRaw, (z) => Math.round(z + 2000)); // Ensure correct sorting

          return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center backface-visible"
              style={{
                width: itemWidth,
                height: isMobile ? '80px' : '100px',
                transform,
                opacity,
                zIndex
              }}
            >
              <div className="flex items-center gap-3 p-3 w-full rounded-xl bg-background/40 backdrop-blur-md border border-primary/20 hover:border-primary/60 transition-all cursor-pointer group hover:bg-background/60 shadow-md">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <item.icon className={`text-primary ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                </div>
                <div className="overflow-hidden">
                  <h4 className={`text-foreground font-medium truncate ${isMobile ? 'text-sm' : 'text-lg'}`}>{item.name}</h4>
                  {!isMobile && (
                    <>
                      {item.category && <span className="text-xs text-muted-foreground block">{item.category}</span>}
                      {item.level && <span className="text-xs text-primary font-display block">{item.level}% Proficiency</span>}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const DailyActivity = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <style>{`
        .perspective-container {
            perspective: 2000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .backface-visible {
            backface-visibility: visible;
        }
        `}</style>
      <div className="container mx-auto max-w-6xl mb-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Routine
          </span>
          <h2 className="section-title gradient-text mb-6">
            Daily Activity
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12">
        {/* Row 1: Tools - Rotating Left */}
        <div>
          <h3 className="text-center text-muted-foreground mb-4 font-display tracking-widest text-sm uppercase">Daily Tools</h3>
          <Carousel3D items={activities} direction="left" speed={30} />
        </div>

        {/* Row 2: Technologies - Rotating Right */}
        <div>
          <h3 className="text-center text-muted-foreground mb-4 font-display tracking-widest text-sm uppercase">Technologies</h3>
          <Carousel3D items={technologies} direction="right" speed={35} />
        </div>
      </div>
    </section>
  );
};

export default DailyActivity;
