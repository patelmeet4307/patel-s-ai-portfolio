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
  const itemHeight = isMobile ? 80 : 100; // Used for vertical calculation
  const gap = isMobile ? 20 : 0; // Simulated gap for vertical math
  const count = items.length;

  // Responsive radius configuration
  // Desktop: Horizontal Ellipse
  const xRadius = Math.max((count * itemWidth) / (2 * Math.PI) * 1.8, 600);
  const zRadiusDesktop = xRadius * 0.6;

  // Mobile: Vertical Circle/Ellipse
  // We need enough height to fit items without overlapping too much
  const yRadius = isMobile
    ? Math.max((count * (itemHeight + gap)) / (2 * Math.PI), 140)
    : 0;
  const zRadiusMobile = yRadius * 0.9;

  // Final Z radius based on mode
  const zRadius = isMobile ? zRadiusMobile : zRadiusDesktop;

  // Use a motion value for continuous rotation
  const rot = useMotionValue(0);

  // Animate the rotation
  useEffect(() => {
    const dir = direction === "left" ? -1 : 1;

    // Desktop: Slow, elegant rotation (using the passed 'speed' prop, e.g., 30s)
    // Mobile: Faster, snappy vertical rotation (fixed at 10s)
    const duration = isMobile ? 10 : speed;

    const controls = animate(rot, 360 * dir, {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return controls.stop;
  }, [direction, speed, rot, isMobile]);

  return (
    <div className={`relative flex justify-center items-center perspective-container overflow-visible w-full ${isMobile ? 'h-[400px]' : 'h-[350px]'}`}>
      <div
        className="relative preserve-3d w-full h-full flex items-center justify-center"
      >
        {items.map((item, index) => {
          const itemAngleOffset = (index / count) * 360;

          const transform = useTransform(rot, (currentRotation) => {
            const theta = (currentRotation + itemAngleOffset) * (Math.PI / 180);

            if (isMobile) {
              // Vertical Rotation (Rolodex / Ferris Wheel style)
              // Rotate around X-axis implied by moving Y and Z.
              const y = yRadius * Math.sin(theta);
              const z = zRadius * Math.cos(theta);
              // We translate Y and Z. X is centered (0).
              return `translate3d(0, ${y}px, ${z}px)`;
            } else {
              // Horizontal Rotation (Carousel)
              const x = xRadius * Math.sin(theta);
              const z = zRadius * Math.cos(theta);
              return `translate3d(${x}px, 0, ${z}px)`;
            }
          });

          // Calculate Z properties for sorting and opacity
          const zRaw = useTransform(rot, (currentRotation) => {
            const theta = (currentRotation + itemAngleOffset) * (Math.PI / 180);
            return zRadius * Math.cos(theta);
          });

          // Mobile: Only show front half (z > 0) to prevent overlap at top/bottom
          // Desktop: Fade from back to front (z > -zRadius)
          const opacity = useTransform(
            zRaw,
            isMobile ? [0, zRadius] : [-zRadius, zRadius],
            isMobile ? [0, 1] : [0.5, 1]
          );

          const zIndex = useTransform(zRaw, (z) => Math.round(z + 2000));

          return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center backface-visible"
              style={{
                width: isMobile ? '90%' : itemWidth, // Full width on mobile looks better if centered
                maxWidth: isMobile ? '280px' : 'none',
                height: itemHeight,
                transform,
                opacity,
                zIndex
              }}
            >
              <div className="flex items-center gap-3 p-3 w-full rounded-xl bg-background/40 backdrop-blur-md border border-primary/20 hover:border-primary/60 transition-all cursor-pointer group hover:bg-background/60 shadow-md">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <item.icon className={`text-primary ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                </div>
                <div className="overflow-hidden text-left">
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
