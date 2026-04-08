import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { submitLead } from '@/lib/lead';

const projectTypes = [
  'Basic Web App',
  'Brand Web App',
  'Mobile & Desktop',
  'Brand Identity',
  'AI Automation',
] as const;

type ProjectType = (typeof projectTypes)[number];

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  projectType: ProjectType;
  message: string;
};

const projectDetailOptions: Record<ProjectType, { prompt: string; options: string[] }> = {
  'Basic Web App': {
    prompt: 'Tick the core features you want so we know the exact scope.',
    options: [
      'Lead capture / contact form',
      'Booking or appointment system',
      'Login / sign-up',
      'Payment / checkout',
      'Blog or content section',
      'Admin dashboard',
      'Other custom feature',
    ],
  },
  'Brand Web App': {
    prompt: 'Tick the brand-focused features that matter most to you.',
    options: [
      'Premium visual design',
      'Scroll animations / motion',
      'Portfolio or showcase sections',
      'CMS / editable content',
      'SEO setup',
      'Lead capture / contact form',
      'Other custom feature',
    ],
  },
  'Mobile & Desktop': {
    prompt: 'Tick the platforms and product needs that apply.',
    options: [
      'Android app',
      'iPhone app',
      'Desktop app',
      'Offline access',
      'Push notifications',
      'API integrations',
      'Other custom feature',
    ],
  },
  'Brand Identity': {
    prompt: 'Tick the brand assets you need us to create.',
    options: [
      'Logo design',
      'Color palette',
      'Typography direction',
      'Social media kit',
      'Brand guidelines',
      'Presentation / pitch deck style',
      'Other brand asset',
    ],
  },
  'AI Automation': {
    prompt: 'Tick the automation goals you want us to explore.',
    options: [
      'Lead qualification',
      'Chatbot / assistant',
      'Email automation',
      'Data extraction',
      'Reporting dashboard',
      'CRM integration',
      'Other automation task',
    ],
  },
};

const initialFormState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  projectType: 'Basic Web App',
  message: '',
};

const ContactPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const currentProjectDetails = projectDetailOptions[formData.projectType];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((current) => {
      switch (name) {
        case 'firstName':
          return { ...current, firstName: value };
        case 'lastName':
          return { ...current, lastName: value };
        case 'email':
          return { ...current, email: value };
        case 'projectType':
          return { ...current, projectType: value as ProjectType };
        case 'message':
          return { ...current, message: value };
        default:
          return current;
      }
    });

    if (name === 'projectType') {
      setSelectedDetails([]);
    }
  };

  const toggleDetail = (detail: string) => {
    setSelectedDetails((current) =>
      current.includes(detail) ? current.filter((item) => item !== detail) : [...current, detail]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');

    try {
      await submitLead({
        kind: 'contact',
        ...formData,
        details: selectedDetails,
      });
      setStatusType('success');
      setStatusMessage('Thanks. Your message and details have been sent to the team.');
      setFormData(initialFormState);
      setSelectedDetails([]);
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error instanceof Error ? error.message : 'We could not send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form className="space-y-12" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">First Name</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Last Name</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14 outline-none"
                    >
                      <option>Basic Web App</option>
                      <option>Brand Web App</option>
                      <option>Mobile & Desktop</option>
                      <option>Brand Identity</option>
                      <option>AI Automation</option>
                    </select>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Project Details</label>
                      <p className="text-sm text-foreground/50 mt-2">{currentProjectDetails.prompt}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentProjectDetails.options.map((option) => {
                        const checked = selectedDetails.includes(option);

                        return (
                          <label
                            key={option}
                            className="flex items-start gap-4 border border-foreground/10 px-5 py-4 cursor-pointer transition-colors hover:border-primary/60"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDetail(option)}
                              className="mt-1 h-4 w-4 border-2 border-foreground/30 text-primary focus:ring-primary"
                            />
                            <span className="text-base leading-relaxed font-medium">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Additional Notes</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic min-h-[150px] resize-none"
                      placeholder="Tell us anything else we should know..."
                      required
                    />
                  </div>
                  <Button className="w-full h-20 text-lg font-bold tracking-[0.2em] rounded-none" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </Button>
                  {statusMessage ? (
                    <p
                      className={`text-sm font-medium ${statusType === 'success' ? 'text-primary' : 'text-destructive'}`}
                      role="status"
                    >
                      {statusMessage}
                    </p>
                  ) : null}
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
