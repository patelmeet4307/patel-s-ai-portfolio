import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Server, Brain, Rocket } from 'lucide-react';

const goals = [
  {
    icon: Smartphone,
    title: 'App Developer',
    description: 'Building cross-platform mobile applications that deliver seamless user experiences.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Server,
    title: 'Software Engineer',
    description: 'Developing enterprise-grade software with robust architecture and scalability.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Brain,
    title: 'AI Specialist',
    description: 'Creating intelligent systems using machine learning and deep learning techniques.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Tech Innovator',
    description: 'Leading innovation by combining cutting-edge technologies to solve real-world problems.',
    color: 'from-purple-400 to-pink-500',
  },
];

const CareerGoals = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Vision
          </span>
          <h2 className="section-title gradient-text mb-6">
            Career Goals
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-all"
                >
                  <goal.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 text-center group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                
                <p className="text-muted-foreground text-sm text-center leading-relaxed">
                  {goal.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerGoals;
