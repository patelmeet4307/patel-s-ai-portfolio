import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Award, BookOpen, Clock, X, ExternalLink } from 'lucide-react';
import CountUp from 'react-countup';

import certJavaBootcamp from '@/assets/cert-java-bootcamp.jpg';
import certGeminiWriteoff from '@/assets/cert-gemini-writeoff.jpg';
import certPythonBootcamp from '@/assets/cert-python-bootcamp.jpg';
import certAzureCognitive from '@/assets/cert-azure-cognitive.jpg';
import certCppBootcamp from '@/assets/cert-cpp-bootcamp.jpg';

const certificates = [
  {
    id: 1,
    title: 'Java Bootcamp',
    issuer: 'LetsUpgrade',
    date: 'Dec 2025',
    image: certJavaBootcamp,
  },
  {
    id: 2,
    title: 'Gemini Write-off Participation',
    issuer: 'Google Student Ambassador Program',
    date: 'Nov 2025',
    image: certGeminiWriteoff,
  },
  {
    id: 3,
    title: 'Complete Python Bootcamp',
    issuer: 'CodeWithHarry',
    date: 'Dec 2025',
    image: certPythonBootcamp,
  },
  {
    id: 4,
    title: 'Azure Cognitive Services',
    issuer: 'Microsoft - Coursera',
    date: 'Sep 2024',
    image: certAzureCognitive,
  },
  {
    id: 5,
    title: 'C++ Bootcamp',
    issuer: 'LetsUpgrade',
    date: 'Dec 2025',
    image: certCppBootcamp,
  },
];

const achievementStats = [
  { icon: Award, label: 'Certificates', value: 5, suffix: '+' },
  { icon: BookOpen, label: 'Courses', value: 2, suffix: '+' },
  { icon: Clock, label: 'Learning Hours', value: 100, suffix: '+' },
];

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Recognition
          </span>
          <h2 className="section-title gradient-text mb-6">
            Achievements
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {achievementStats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="font-display text-3xl font-bold text-primary mb-2 stat-glow">
                {inView && (
                  <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCert(cert)}
              className="glass-card overflow-hidden cursor-pointer group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1 line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-primary text-xs">{cert.issuer}</p>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <span className="text-muted-foreground text-xs">{cert.date}</span>
                <button className="text-primary text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-3xl w-full overflow-hidden relative"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <X size={20} />
              </button>
              
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {selectedCert.title}
                </h3>
                <p className="text-primary mb-1">{selectedCert.issuer}</p>
                <p className="text-muted-foreground text-sm">{selectedCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
