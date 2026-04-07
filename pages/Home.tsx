import React from 'react';
import { 
  Smartphone, 
  Globe, 
  Monitor, 
  Palette, 
  GraduationCap, 
  ShoppingCart, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Badge variant="outline" className="rounded-none border-foreground text-[10px] font-bold tracking-[0.2em] px-4 py-1">
                  EST. 2026
                </Badge>
                <div className="h-[1px] w-20 bg-foreground/20" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/50 uppercase">Digital Transformation Agency</span>
              </div>
              
              <h1 className="text-7xl lg:text-[10vw] font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
                We build the <span className="text-primary">digital future</span> of your business.
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <p className="text-lg text-foreground/70 leading-relaxed max-w-md font-medium">
                Young Future Tech is a forward-thinking agency delivering basic and brand web apps, mobile and desktop solutions, and AI automation.
              </p>
                <div className="flex gap-4">
                  <Button asChild size="lg" className="h-16 px-10 text-sm font-bold tracking-[0.1em] group">
                    <Link to="/contact">
                      WORK WITH US <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="border-l border-border pl-8 py-4"
            >
              <div className="text-[10px] font-bold tracking-[0.2em] text-foreground/50 mb-4 uppercase">Capabilities</div>
              <ul className="space-y-2 font-serif italic text-xl">
                <li>Web Apps (Basic & Brand)</li>
                <li>Mobile & Desktop</li>
                <li>Brand Identity</li>
                <li>AI Automation</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceItemProps {
  number: string;
  title: string;
  description: string;
  delay: number;
  key?: React.Key;
}

const ServiceItem = ({ number, title, description, delay }: ServiceItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group border-b border-border last:border-b-0 lg:border-b-0 lg:border-r border-border last:border-r-0 p-12 hover:bg-foreground hover:text-background transition-all duration-500"
  >
    <div className="font-mono text-xs mb-12 text-primary group-hover:text-primary transition-colors">[{number}]</div>
    <h3 className="text-4xl font-serif italic mb-6 leading-tight">{title}</h3>
    <p className="text-foreground/60 group-hover:text-background/60 leading-relaxed mb-10 text-sm font-medium">
      {description}
    </p>
    <Button asChild variant="link" className="p-0 h-auto text-[10px] font-bold tracking-[0.2em] text-foreground group-hover:text-background transition-colors">
      <Link to="/services">
        EXPLORE SERVICE <ArrowRight className="ml-2 w-3 h-3" />
      </Link>
    </Button>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Basic Web Apps",
      description: "Simple, effective, and high-performance digital presence for emerging businesses.",
    },
    {
      number: "02",
      title: "Brand Web Apps",
      description: "Custom, high-end digital experiences designed to elevate your brand's unique identity.",
    },
    {
      number: "03",
      title: "Mobile & Desktop",
      description: "Native and cross-platform applications built with Flutter for seamless performance across all devices.",
    },
    {
      number: "04",
      title: "Brand Identity",
      description: "Distinctive visual storytelling and UI/UX architecture that defines your market presence.",
    },
    {
      number: "05",
      title: "AI Automation",
      description: "Intelligent workflows and task automation solutions to scale your company's efficiency.",
    },
  ];

  return (
    <section id="services" className="border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {services.map((service, index) => (
          <ServiceItem 
            key={index} 
            number={service.number}
            title={service.title}
            description={service.description}
            delay={index * 0.1} 
          />
        ))}
      </div>
    </section>
  );
};

const IndustrySection = () => {
  return (
    <section id="industries" className="py-32 border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">Sectors</div>
            <h2 className="text-6xl lg:text-8xl font-serif italic mb-12 leading-[0.9] tracking-tighter">
              Specialized for <span className="text-primary">every</span> industry.
            </h2>
            <p className="text-xl text-foreground/70 mb-16 leading-relaxed max-w-lg font-medium">
              We solve complex, industry-specific challenges with innovative digital tools designed for long-term scalability.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-serif italic">E-Learning</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-medium">Interactive learning management systems and educational tools that make knowledge accessible.</p>
              </div>
              
              <div className="space-y-6">
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-serif italic">E-Commerce</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-medium">Robust online stores with secure payments, inventory management, and seamless checkout flows.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-foreground/90 backdrop-blur-sm text-background p-16 lg:p-24"
          >
            <div className="font-mono text-[10px] mb-12 text-primary uppercase tracking-[0.2em]">Why Young Future</div>
            <h3 className="text-5xl font-serif italic mb-12 leading-tight">Our philosophy is simple: precision over noise.</h3>
            <ul className="space-y-8">
              {[
                "Editorial-First Design",
                "Agile Engineering",
                "Future-Proof Tech Stack",
                "Dedicated Maintenance",
                "Innovation-Driven"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group">
                  <div className="w-2 h-2 bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-2xl font-serif italic">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="absolute top-0 right-0 p-8">
              <ArrowUpRight className="w-12 h-12 text-primary opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProjects = () => {
  const featured = [
    {
      title: "Open Audio Web App",
      highlight: "Web",
      description: "The web-based counterpart to the Open Audio mobile platform. A fully responsive music streaming experience accessible from any browser, featuring high-fidelity playback and seamless library synchronization.",
      tags: ["Web App", "React", "Music Streaming", "Responsive"],
      link: "https://open-audio-mobile.vercel.app/",
      linkText: "VISIT WEB APP",
      image: "https://picsum.photos/seed/openaudio-web/800/1000"
    },
    {
      title: "Open Audio",
      highlight: "Audio",
      description: "A professional music streaming application developed with Flutter. Stream high-quality audio, create personalized playlists, and discover new tracks globally.",
      tags: ["Flutter", "Music Streaming", "Play Store", "Cross-Platform"],
      link: "https://play.google.com/store/apps/details?id=com.youngfuturetech.musicstreamapp",
      linkText: "VIEW ON PLAY STORE",
      image: "/open-audio.png"
    },
    {
      title: "Khadys Presale Palace",
      highlight: "Palace",
      description: "A premium preorder e-commerce platform designed for exclusive collections. Features a high-end editorial interface with seamless preorder management.",
      tags: ["E-Commerce", "Web App", "Preorder", "Premium"],
      link: "https://khadyspresalepalace.com/",
      linkText: "VISIT WEBSITE",
      image: "/khadys.png"
    }
  ];

  return (
    <section className="py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-24 uppercase text-center">Featured Projects</div>
        
        <div className="space-y-40">
          {featured.map((project, i) => (
            <div key={project.title} className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={i % 2 === 1 ? 'lg:order-2' : ''}
              >
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif italic mb-8 lg:mb-12 leading-[0.9] tracking-tighter">
                  {project.title.split(' ').map((word, index) => (
                    <React.Fragment key={index}>
                      {word === project.highlight ? <span className="text-primary">{word}</span> : word}{' '}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-lg lg:text-xl text-foreground/70 mb-8 lg:mb-12 leading-relaxed max-w-lg font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8 lg:mb-12">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-none border-foreground/20 text-[10px] font-bold tracking-[0.1em] px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild size="lg" className="h-14 lg:h-16 px-8 lg:px-10 text-sm font-bold tracking-[0.1em] group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.linkText} <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative aspect-[16/10] sm:aspect-[4/5] bg-foreground overflow-hidden ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[10px] lg:border-[20px] border-background/10 pointer-events-none" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <IndustrySection />
    </>
  );
};

export default Home;
