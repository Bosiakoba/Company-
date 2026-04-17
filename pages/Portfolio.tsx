import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProjectsHome } from '@/lib/projects';

const Portfolio = () => {
  const projects = featuredProjectsHome;

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="rounded-none border-foreground text-[10px] font-bold tracking-[0.2em] px-4 py-1 mb-8">
              OUR WORK
            </Badge>
            <h1 className="text-7xl lg:text-9xl font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
              The <span className="text-primary">portfolio</span> of excellence.
            </h1>
            <p className="text-editorial text-2xl text-foreground/75 max-w-3xl">
              Live products and shipped work—ordered to highlight SaaS depth, platforms, and polish. No filler: every entry links to something you can open today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-[16/10] bg-muted mb-10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </a>
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-primary mb-4 uppercase">{project.category}</p>
                    <h2 className="text-4xl lg:text-5xl font-serif italic mb-6 leading-tight">{project.title}</h2>
                    <p className="text-editorial text-lg text-foreground/75 max-w-md mb-8">
                      {project.description}
                    </p>
                    <Button asChild variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-6 h-10 border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.linkText} <ExternalLink className="ml-2 w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-border bg-foreground/90 backdrop-blur-sm text-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl lg:text-8xl font-serif italic mb-12 leading-[0.9] tracking-tighter">
            Ready to build your <span className="text-primary">extraordinary</span> project?
          </h2>
          <Button asChild size="lg" className="h-20 px-16 text-lg font-bold tracking-[0.1em] group bg-primary hover:bg-primary/90">
            <Link to="/contact">
              START PROJECT <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
