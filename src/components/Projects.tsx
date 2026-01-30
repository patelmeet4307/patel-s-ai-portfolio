import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, MessageSquare, Shield, Smartphone, BarChart3, Bot } from 'lucide-react';

const projects = [
  {
    icon: Brain,
    title: 'AI Image Classifier',
    description: 'Deep learning model for image classification using TensorFlow and CNNs.',
    tags: ['Python', 'TensorFlow', 'CNN'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Smart Chatbot',
    description: 'NLP-powered conversational AI built with Python and natural language processing.',
    tags: ['Python', 'NLP', 'Flask'],
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Smartphone,
    title: 'Task Manager App',
    description: 'Cross-platform mobile app for productivity with React Native and Firebase.',
    tags: ['React Native', 'Firebase', 'Redux'],
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    icon: Shield,
    title: 'Fraud Detection System',
    description: 'ML-based system for detecting fraudulent transactions in real-time.',
    tags: ['Python', 'Scikit-learn', 'Pandas'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: BarChart3,
    title: 'Data Dashboard',
    description: 'Interactive analytics dashboard with real-time data visualization.',
    tags: ['React', 'D3.js', 'Node.js'],
    color: 'from-pink-500/20 to-red-500/20',
  },
  {
    icon: Bot,
    title: 'Automation Bot',
    description: 'Workflow automation tool for repetitive tasks using Python scripting.',
    tags: ['Python', 'Selenium', 'APIs'],
    color: 'from-red-500/20 to-orange-500/20',
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="section-title gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my work in app development, software engineering, and AI/ML projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, rotateY: 5 }}
              style={{ perspective: 1000 }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <project.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <Github size={16} />
                    Code
                  </button>
                  <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink size={16} />
                    Demo
                  </button>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/50" />
                <div className="absolute top-4 right-8 w-1 h-1 rounded-full bg-primary/30" />
                <div className="absolute top-8 right-4 w-1 h-1 rounded-full bg-primary/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
