import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { submitLead } from '@/lib/lead';

const projectTypes = [
  'Landing Page / One-Pager',
  'Business Website',
  'Ecommerce Website',
  'Custom Web App',
  'Mobile App',
  'Website Redesign',
  'Brand Identity',
  'AI Automation',
] as const;

type ProjectType = (typeof projectTypes)[number];

type ContactFormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  businessType: string;
  projectType: ProjectType;
  stylePreference: string;
  timeline: string;
  budget: string;
  currentWebsite: string;
  referenceLinks: string;
  message: string;
};

const projectScopeOptions: Record<ProjectType, { prompt: string; options: string[] }> = {
  'Landing Page / One-Pager': {
    prompt: 'Tick the conversion goals this page should support.',
    options: [
      'Lead capture form',
      'Call or WhatsApp CTA',
      'Waitlist signup',
      'Event registration',
      'Product pre-order',
      'Single service offer',
      'Other landing page goal',
    ],
  },
  'Business Website': {
    prompt: 'Tick the sections and capabilities your website needs.',
    options: [
      'Homepage',
      'About / company story',
      'Services / solutions',
      'Portfolio / case studies',
      'Blog / articles',
      'FAQ / support',
      'Contact form',
      'Other website section',
    ],
  },
  'Ecommerce Website': {
    prompt: 'Tick the ecommerce pieces that matter most.',
    options: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'Payment gateway',
      'Shipping setup',
      'Discount codes',
      'Inventory management',
      'Other ecommerce feature',
    ],
  },
  'Custom Web App': {
    prompt: 'Tick the app capabilities you need.',
    options: [
      'User accounts / auth',
      'Dashboard',
      'Admin panel',
      'Role-based access',
      'Data tables / reports',
      'API integrations',
      'File uploads',
      'Other app feature',
    ],
  },
  'Mobile App': {
    prompt: 'Tick the mobile app needs that apply.',
    options: [
      'Android app',
      'iPhone app',
      'Push notifications',
      'Offline access',
      'Payments / in-app purchases',
      'API sync',
      'App store launch support',
      'Other mobile feature',
    ],
  },
  'Website Redesign': {
    prompt: 'Tick what the redesign should improve.',
    options: [
      'Visual refresh',
      'Better UX / navigation',
      'Mobile responsiveness',
      'SEO performance',
      'Faster loading',
      'Content restructure',
      'Conversion improvements',
      'Other redesign goal',
    ],
  },
  'Brand Identity': {
    prompt: 'Tick the brand assets you want us to create.',
    options: [
      'Logo design',
      'Color palette',
      'Typography direction',
      'Brand guidelines',
      'Social media kit',
      'Pitch deck style',
      'Business card / stationery',
      'Other brand asset',
    ],
  },
  'AI Automation': {
    prompt: 'Tick the automation outcomes you want to achieve.',
    options: [
      'Lead qualification',
      'Email automation',
      'Chat assistant',
      'Reporting dashboard',
      'CRM integration',
      'Data extraction',
      'Workflow automation',
      'Other automation task',
    ],
  },
};

const goals = [
  'Generate more leads',
  'Sell products online',
  'Book calls or appointments',
  'Showcase services clearly',
  'Build brand credibility',
  'Automate manual work',
  'Launch a new product',
  'Replace an outdated website',
];

const pages = [
  'Home',
  'About',
  'Services',
  'Portfolio / Projects',
  'Pricing',
  'FAQ',
  'Blog / News',
  'Testimonials',
  'Contact',
  'Landing Pages',
];

const features = [
  'Contact form',
  'WhatsApp chat',
  'Live chat',
  'Newsletter signup',
  'Booking system',
  'Payments',
  'Blog management',
  'CMS editing',
  'Google Maps',
  'Analytics tracking',
  'Multilingual support',
  'Admin dashboard',
];

const assets = [
  'Logo already available',
  'Brand guidelines available',
  'Copywriting needed',
  'Photography needed',
  'Need content strategy',
  'Need domain setup',
  'Need hosting setup',
  'Need email setup',
];

const budgetOptions = ['Under $500', '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'];
const timelineOptions = ['ASAP', '1 - 2 weeks', '2 - 4 weeks', '1 - 2 months', 'Flexible'];
const styleOptions = ['Minimal', 'Editorial', 'Bold', 'Corporate', 'Luxury', 'Playful', 'Tech-forward'];
const businessOptions = ['Startup', 'Small Business', 'SME', 'Personal Brand', 'Agency', 'Nonprofit', 'Institution', 'Ecommerce'];

const initialFormState: ContactFormState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  website: '',
  country: '',
  businessType: '',
  projectType: 'Landing Page / One-Pager',
  stylePreference: '',
  timeline: '',
  budget: '',
  currentWebsite: '',
  referenceLinks: '',
  message: '',
};

function ChecklistSection({
  title,
  description,
  options,
  selected,
  onToggle,
}: {
  title: string;
  description: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">{title}</label>
        <p className="text-sm text-foreground/50 mt-2">{description}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option) => {
          const checked = selected.includes(option);

          return (
            <label
              key={option}
              className={`flex items-start gap-4 border px-5 py-4 cursor-pointer transition-colors ${
                checked ? 'border-primary bg-primary/5' : 'border-foreground/10 hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="mt-1 h-4 w-4 border-2 border-foreground/30 text-primary focus:ring-primary"
              />
              <span className="text-base leading-relaxed font-medium">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const ContactPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const currentScope = projectScopeOptions[formData.projectType];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value } as ContactFormState));

    if (name === 'projectType') {
      setSelectedScope([]);
    }
  };

  const toggleItem = (item: string, setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
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
        scope: selectedScope,
        goals: selectedGoals,
        pages: selectedPages,
        features: selectedFeatures,
        assets: selectedAssets,
      });
      setStatusType('success');
      setStatusMessage('Thanks. Your project brief has been sent to the team.');
      setFormData(initialFormState);
      setSelectedGoals([]);
      setSelectedPages([]);
      setSelectedFeatures([]);
      setSelectedAssets([]);
      setSelectedScope([]);
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error instanceof Error ? error.message : 'We could not send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32">
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="outline" className="rounded-none border-foreground text-[10px] font-bold tracking-[0.2em] px-4 py-1 mb-8">
              GET A QUOTE
            </Badge>
            <h1 className="text-7xl lg:text-9xl font-serif italic font-medium leading-[0.85] tracking-[-0.04em] mb-12">
              Let’s scope <span className="text-primary">everything</span>.
            </h1>
            <p className="text-2xl text-foreground/70 leading-relaxed max-w-3xl font-medium">
              Share as much detail as you can. The more we understand about your goals, scope, and timeline, the better we can shape the right solution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5">
              <div className="text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">Project Discovery</div>
              <h2 className="text-5xl font-serif italic mb-12 leading-[0.9] tracking-tighter">
                Tell us what you need and we’ll map out the <span className="text-primary">right build</span>.
              </h2>

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
                    <a href="https://wa.link/vrmh6x" target="_blank" rel="noopener noreferrer" className="text-2xl font-serif italic hover:text-primary transition-colors">
                      +233 53 810 1569
                    </a>
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
              <Card className="rounded-none border-2 border-foreground shadow-none p-8 lg:p-12">
                <form className="space-y-12" onSubmit={handleSubmit}>
                  <section className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-serif italic">Contact details</h3>
                      <p className="text-sm text-foreground/50 mt-2">Start with the basics so we know who the project is for.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">First Name</label>
                        <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Last Name</label>
                        <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Company / Brand</label>
                        <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Young Future Tech" className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Country</label>
                        <Input name="country" value={formData.country} onChange={handleChange} placeholder="Ghana" className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Email Address</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Phone</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+233..." className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Website / Social Link</label>
                      <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Business Type</label>
                      <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary px-0 text-2xl font-serif italic h-14 outline-none">
                        <option value="">Select business type</option>
                        {businessOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  <section className="space-y-8 pt-4">
                    <div>
                      <h3 className="text-2xl font-serif italic">Project snapshot</h3>
                      <p className="text-sm text-foreground/50 mt-2">Choose the main project type so we can ask the right questions.</p>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Project Type</label>
                      <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary px-0 text-2xl font-serif italic h-14 outline-none">
                        {projectTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <ChecklistSection
                      title="Project Scope"
                      description={currentScope.prompt}
                      options={currentScope.options}
                      selected={selectedScope}
                      onToggle={(value) => toggleItem(value, setSelectedScope)}
                    />
                  </section>

                  <section className="space-y-8 pt-4">
                    <div>
                      <h3 className="text-2xl font-serif italic">Goals and structure</h3>
                      <p className="text-sm text-foreground/50 mt-2">Tick everything that should be part of the experience.</p>
                    </div>

                    <ChecklistSection
                      title="Primary Goals"
                      description="What should this project help you achieve first?"
                      options={goals}
                      selected={selectedGoals}
                      onToggle={(value) => toggleItem(value, setSelectedGoals)}
                    />

                    <ChecklistSection
                      title="Pages Needed"
                      description="Select the pages or sections you expect on launch."
                      options={pages}
                      selected={selectedPages}
                      onToggle={(value) => toggleItem(value, setSelectedPages)}
                    />

                    <ChecklistSection
                      title="Features"
                      description="Choose the features you want built into the project."
                      options={features}
                      selected={selectedFeatures}
                      onToggle={(value) => toggleItem(value, setSelectedFeatures)}
                    />
                  </section>

                  <section className="space-y-8 pt-4">
                    <div>
                      <h3 className="text-2xl font-serif italic">Design, readiness, and timeline</h3>
                      <p className="text-sm text-foreground/50 mt-2">This helps us understand the level of support you need.</p>
                    </div>

                    <ChecklistSection
                      title="Assets / Readiness"
                      description="Tell us what already exists and what we need to create."
                      options={assets}
                      selected={selectedAssets}
                      onToggle={(value) => toggleItem(value, setSelectedAssets)}
                    />

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Style Preference</label>
                        <select name="stylePreference" value={formData.stylePreference} onChange={handleChange} className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary px-0 text-2xl font-serif italic h-14 outline-none">
                          <option value="">Select a style</option>
                          {styleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Timeline</label>
                        <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary px-0 text-2xl font-serif italic h-14 outline-none">
                          <option value="">Select timeline</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Budget Range</label>
                        <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus-visible:border-primary px-0 text-2xl font-serif italic h-14 outline-none">
                          <option value="">Select budget</option>
                          {budgetOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Current Website</label>
                        <Input
                          name="currentWebsite"
                          value={formData.currentWebsite}
                          onChange={handleChange}
                          placeholder="If you already have one"
                          className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic h-14"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Reference Links</label>
                      <Textarea
                        name="referenceLinks"
                        value={formData.referenceLinks}
                        onChange={handleChange}
                        className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic min-h-[120px] resize-none"
                        placeholder="Share websites, competitors, or inspiration links"
                      />
                    </div>
                  </section>

                  <section className="space-y-4 pt-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Project Brief</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-none border-0 border-b-2 border-foreground/20 focus-visible:border-primary focus-visible:ring-0 px-0 text-2xl font-serif italic min-h-[180px] resize-none"
                      placeholder="Tell us the full story, constraints, and anything we should know before quoting."
                      required
                    />
                  </section>

                  <Button className="w-full h-20 text-lg font-bold tracking-[0.2em] rounded-none" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'SENDING...' : 'REQUEST QUOTE'} <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>

                  {statusMessage ? (
                    <p className={`text-sm font-medium ${statusType === 'success' ? 'text-primary' : 'text-destructive'}`} role="status">
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
