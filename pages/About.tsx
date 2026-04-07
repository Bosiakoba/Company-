import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  History, 
  Target, 
  Lightbulb, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: "YEARS EXP", value: "4+" },
    { label: "PROJECTS", value: "30+" },
    { label: "CLIENTS", value: "20+" },
    { label: "COUNTRIES", value: "5" },
  ];

  const values = [
    {
      icon: Zap,
      title: "Agility",
      description: "We move fast without breaking things. Our agile process ensures rapid delivery without compromising on quality."
    },
    {
      icon: ShieldCheck,
      title: "Reliability",
      description: "We build systems that last. Stability and security are at the core of every line of code we write."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We don't just follow trends; we set them. We're constantly exploring new technologies to give you a competitive edge."
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
              ABOUT US
            </Badge>
            <h1 className="text-7xl lg:text-[10vw] font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
              The <span className="text-primary">architects</span> of tomorrow.
            </h1>
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <p className="text-2xl text-foreground/70 leading-relaxed font-medium">
                Young Future Tech is a digital-first agency dedicated to crafting premium web experiences, robust mobile applications, and intelligent automation systems.
              </p>
              <div className="flex gap-12 border-l border-border pl-12 py-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-serif italic mb-2 text-primary">{stat.value}</div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">Our Mission</div>
              <h2 className="text-5xl lg:text-7xl font-serif italic mb-12 leading-[0.9] tracking-tighter">
                Bridging the gap between <span className="text-primary">vision</span> and <span className="text-primary">reality</span>.
              </h2>
              <p className="text-xl text-foreground/70 mb-12 leading-relaxed max-w-lg font-medium">
                We believe that technology should be an invisible force that empowers businesses. Our goal is to provide high-end, future-proof solutions that allow you to focus on what you do best while we handle the digital complexity.
              </p>
              <Button asChild size="lg" className="h-16 px-10 text-sm font-bold tracking-[0.1em] group">
                <Link to="/contact">
                  WORK WITH US <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-12 lg:p-20 bg-foreground/5 backdrop-blur-sm border border-border"
            >
              <h3 className="text-3xl font-serif italic mb-12">Our Core Values</h3>
              <div className="space-y-12">
                {values.map((value, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <value.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-2xl font-serif italic">{value.title}</h4>
                    </div>
                    <p className="text-foreground/60 leading-relaxed font-bold ml-16">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">Our Philosophy</div>
            <h2 className="text-5xl lg:text-8xl font-serif italic max-w-5xl mx-auto mb-16 leading-[0.9] tracking-tighter">
              We don't just build code; we curate <span className="text-primary">experiences</span>.
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-left mt-24">
              <div className="p-12 border border-border hover:border-primary transition-colors bg-background/50 backdrop-blur-sm">
                <div className="text-primary mb-8 font-mono">[01]</div>
                <h3 className="text-3xl font-serif italic mb-6 text-primary">Strategic Depth</h3>
                <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                  Every project starts with deep research into your market, your competitors, and your users. We don't guess; we strategize based on data.
                </p>
              </div>
              <div className="p-12 border border-border hover:border-primary transition-colors bg-background/50 backdrop-blur-sm">
                <div className="text-primary mb-8 font-mono">[02]</div>
                <h3 className="text-3xl font-serif italic mb-6 text-primary">Technical Excellence</h3>
                <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                  Our stack is curated for maximum performance and longevity. We use the latest technologies like Vite, React, and Flutter to ensure your product stays relevant.
                </p>
              </div>
              <div className="p-12 border border-border hover:border-primary transition-colors bg-background/50 backdrop-blur-sm">
                <div className="text-primary mb-8 font-mono">[03]</div>
                <h3 className="text-3xl font-serif italic mb-6 text-primary">Artistic Precision</h3>
                <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                  We treat every pixel with the respect it deserves. Our design team focuses on editorial layouts and subtle motion to create a truly premium feel.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
