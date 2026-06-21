import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen } from 'lucide-react';

const educationData = [
  {
    icon: GraduationCap,
    degree: 'B.Tech Computer Engineering',
    institution: 'Upl University of Sustainable',
    period: 'Currently Pursuing',
    status: 'In Progress',
    description: 'Focusing on software development, AI/ML, and modern computing technologies.',
  },
  {
    icon: BookOpen,
    degree: 'Higher Secondary (11th & 12th)',
    institution: 'Narayan Vidhya Vihar, Bharuch',
    period: 'Completed',
    status: 'Completed',
    description: 'Strong foundation in Science and Mathematics with focus on Computer Science.',
  },
];

const Education = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Journey
          </span>
          <h2 className="section-title gradient-text mb-6">
            Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line" />

          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div className="timeline-dot" style={{ top: '1.5rem' }}>
                  <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
                </div>

                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 self-start">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {item.degree}
                        </h3>
                        <span className={`text-xs font-display tracking-wider px-3 py-1 rounded-full self-start ${
                          item.status === 'In Progress' 
                            ? 'bg-primary/20 text-primary border border-primary/30' 
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <p className="text-primary/80 font-medium mb-2">
                        {item.institution}
                      </p>
                      
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.period}
                      </p>
                      
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
