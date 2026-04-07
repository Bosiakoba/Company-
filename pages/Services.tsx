import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Globe, 
  Monitor, 
  Palette, 
  Cpu,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: "basic-web",
      icon: Globe,
      title: "Basic Web Apps",
      description: "Simple, effective, and high-performance digital presence for emerging businesses. We focus on speed, SEO, and accessibility to ensure your first step into the digital world is a strong one.",
      features: ["Responsive Design", "SEO Optimization", "Fast Loading Times", "CMS Integration"]
    },
    {
      id: "brand-web",
      icon: Monitor,
      title: "Brand Web Apps",
      description: "Custom, high-end digital experiences designed to elevate your brand's unique identity. We blend editorial design with cutting-edge technology to create immersive web applications.",
      features: ["Custom Animations", "Interactive UI", "Brand Storytelling", "High-Performance Stack"]
    },
    {
      id: "mobile-desktop",
      icon: Smartphone,
      title: "Mobile & Desktop",
      description: "Native and cross-platform applications built with Flutter for seamless performance across all devices. From iOS and Android to Windows and macOS, we've got you covered.",
      features: ["Flutter Development", "React Native", "Native Performance", "Cross-Platform Sync"]
    },
    {
      id: "brand-identity",
      icon: Palette,
      title: "Brand Identity",
      description: "Distinctive visual storytelling and UI/UX architecture that defines your market presence. We create cohesive brand systems that resonate with your audience.",
      features: ["Logo Design", "Typography Systems", "Color Palettes", "Brand Guidelines"]
    },
    {
      id: "ai-automation",
      icon: Cpu,
      title: "AI Automation",
      description: "Intelligent workflows and task automation solutions to scale your company's efficiency. We leverage the latest AI models to automate repetitive tasks and provide data-driven insights.",
      features: ["Custom AI Agents", "Workflow Automation", "Data Analysis", "API Integrations"]
    }
  ];

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
              OUR SERVICES
            </Badge>
            <h1 className="text-7xl lg:text-9xl font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
              We build the <span className="text-primary">extraordinary</span>.
            </h1>
            <p className="text-2xl text-foreground/70 leading-relaxed max-w-3xl font-medium">
              A comprehensive suite of digital services designed to scale your business and elevate your brand's digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-1 font-mono text-primary text-xl">
                  [{String(i + 1).padStart(2, '0')}]
                </div>
                <div className="lg:col-span-6">
                  <div className="w-16 h-16 border-2 border-foreground flex items-center justify-center mb-8">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-serif italic mb-8">{service.title}</h2>
                  <p className="text-xl text-foreground/60 leading-relaxed mb-12 font-medium">
                    {service.description}
                  </p>
                  <Button asChild size="lg" className="h-16 px-10 text-sm font-bold tracking-[0.1em] group">
                    <Link to="/contact">
                      START PROJECT <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="lg:col-span-5 border-l border-border pl-12 py-4">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 mb-8 uppercase">Key Features</div>
                  <ul className="space-y-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 bg-primary group-hover:scale-150 transition-transform" />
                        <span className="text-2xl font-serif italic">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
