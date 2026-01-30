import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FolderGit2, Award, Cpu } from 'lucide-react';

const stats = [
  {
    icon: FolderGit2,
    value: 8,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    icon: Award,
    value: 5,
    suffix: '+',
    label: 'Certificates Earned',
  },
  {
    icon: Cpu,
    value: 5,
    suffix: '+',
    label: 'Technologies Mastered',
  },
];

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div className="font-display text-5xl md:text-6xl font-bold mb-2 stat-glow text-primary">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                
                <p className="text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </p>

                {/* Divider for desktop */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
