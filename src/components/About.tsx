import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Smartphone, Sparkles } from 'lucide-react';

const aboutCards = [
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Creating intuitive mobile applications with modern frameworks and best practices.',
  },
  {
    icon: Code,
    title: 'Software Engineering',
    description: 'Building robust, scalable software solutions with clean architecture.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Implementing intelligent systems that learn, adapt, and solve complex problems.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technologies and creative solutions.',
  },
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            About Me
          </span>
          <h2 className="section-title gradient-text mb-6">
            Who I Am
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
           I'm Patel Meet, a passionate BE Computer Engineering student at UPL University of Sustainable Technology (Sem 4).
           </p>
           
           <p1 className="text-muted-foreground text-lg max-w-2xl mx-auto"> A passionate developer driven by curiosity and the desire to create 
            impactful digital experiences through the power of technology.
            </p1>
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
                  <card.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
