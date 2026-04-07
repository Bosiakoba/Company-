import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const ContactPage = () => {
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
              CONTACT US
            </Badge>
            <h1 className="text-7xl lg:text-9xl font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
              Let's build the <span className="text-primary">extraordinary</span>.
            </h1>
            <p className="text-2xl text-foreground/70 leading-relaxed max-w-3xl font-medium">
              Ready to start your digital journey? Our team is here to help you navigate the tech landscape and create something truly remarkable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5">
              <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">Contact Details</div>
              <h2 className="text-5xl font-serif italic mb-12 leading-[0.9] tracking-tighter">Reach out to <span className="text-primary">Young Future</span>.</h2>
              
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 mb-2 uppercase">Email</p>
                    <p className="text-2xl font-serif italic">hello@youngfuture.tech</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 mb-2 uppercase">Phone & WhatsApp</p>
                    <a href="https://wa.link/vrmh6x" target="_blank" rel="noopener noreferrer" className="text-2xl font-serif italic hover:text-primary transition-colors">+233 53 810 1569</a>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 mb-2 uppercase">Office</p>
                    <p className="text-2xl font-serif italic">Takoradi, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="rounded-none border-2 border-foreground shadow-none p-12 lg:p-20">
                <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">First Name</label>
                      <Input className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" placeholder="John" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Last Name</label>
                      <Input className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Email Address</label>
                    <Input type="email" className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Project Type</label>
                    <select className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14 outline-none">
                      <option>Basic Web App</option>
                      <option>Brand Web App</option>
                      <option>Mobile & Desktop</option>
                      <option>Brand Identity</option>
                      <option>AI Automation</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Message</label>
                    <Textarea className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic min-h-[150px] resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <Button className="w-full h-20 text-lg font-bold tracking-[0.2em] rounded-none">
                    SEND MESSAGE
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
