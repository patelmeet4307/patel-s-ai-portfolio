import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Code2, Cpu, Database, Layers, Terminal, Smartphone } from 'lucide-react';

const skills = [
  { icon: Code2, name: 'JavaScript/TypeScript', verified: true },
  { icon: Terminal, name: 'Python', verified: true },
  { icon: Layers, name: 'React/React Native', verified: true },
  { icon: Database, name: 'SQL & NoSQL', verified: true },
  { icon: Cpu, name: 'Machine Learning', verified: true },
  { icon: Smartphone, name: 'Mobile Development', verified: true },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="section-title gradient-text mb-6">
            Skills Verified
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium flex-1">{skill.name}</span>
                {skill.verified && (
                  <div className="p-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
