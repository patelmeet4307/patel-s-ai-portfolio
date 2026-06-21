import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';

const Hero = () => {
  const taglines = [
    'Building Intelligent Apps with AI & ML',
    2000,
    'Crafting Future-Ready Software Solutions',
    2000,
    'Turning Ideas into Digital Reality',
    2000,
    'App Development meets Machine Learning',
    2000,
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="cyber-grid" />
      
      <div className="container mx-auto max-w-6xl z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-50 blur-xl" 
                   style={{ animationDuration: '8s' }} />
              <div className="absolute inset-2 rounded-full bg-background" />
              
              {/* Image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/50 animate-glow-pulse">
                <img
                  src={profileImage}
                  alt="Patel Meet"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating orbs */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30 blur-sm"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-secondary/30 blur-sm"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4 block">
                Welcome to my Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text">Patel Meet</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 h-16"
            >
              <span className="text-primary mr-2">{'>'}</span>
              <TypeAnimation
                sequence={taglines}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-foreground"
              />
              <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Aspiring App Developer & Software Engineer passionate about 
              building intelligent solutions using AI and Machine Learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#projects" className="glow-button font-display tracking-wide">
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl border border-primary/50 text-primary font-display tracking-wide hover:bg-primary/10 transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/70 hover:text-primary transition-colors"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default Hero;
