import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { submitLead } from '@/lib/lead';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterStatusType, setNewsletterStatusType] = useState<'success' | 'error' | ''>('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingNewsletter(true);
    setNewsletterStatus('');
    setNewsletterStatusType('');

    try {
      await submitLead({
        kind: 'newsletter',
        email: newsletterEmail,
      });
      setNewsletterStatusType('success');
      setNewsletterStatus('Thanks for subscribing. We have received your email.');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatusType('error');
      setNewsletterStatus(error instanceof Error ? error.message : 'We could not submit your email right now.');
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const socials = [{ icon: MessageCircle, href: 'https://wa.link/vrmh6x', label: 'WhatsApp' }];

  return (
    <footer className="py-20 bg-background/40 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-8 h-8 bg-primary flex items-center justify-center transition-transform group-hover:rotate-90">
                <span className="text-white font-bold">Y</span>
              </div>
              <span className="text-xl font-bold tracking-tighter font-serif italic">YOUNG FUTURE TECH</span>
            </Link>
            <p className="text-editorial text-sm text-foreground/65 mb-10">
              Building the digital future through innovative technology and editorial design precision.
            </p>
            <div className="flex gap-6">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="text-foreground/40 hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-8">Services</h4>
            <ul className="space-y-4 font-serif italic text-lg">
              {[
                { name: "Basic Web Apps", href: "/services" },
                { name: "Brand Web Apps", href: "/services" },
                { name: "Mobile & Desktop", href: "/services" },
                { name: "Brand Identity", href: "/services" },
                { name: "AI Automation", href: "/services" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-8">Company</h4>
            <ul className="space-y-4 font-serif italic text-lg">
              {[
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-8">Newsletter</h4>
            <p className="text-editorial text-sm text-foreground/65 mb-8">Stay updated with the latest tech trends and our agency news.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-0 border-b-2 border-foreground/20 focus-within:border-primary transition-colors">
                <input
                  type="email"
                  placeholder="Email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  className="bg-transparent px-0 py-3 outline-none w-full font-serif italic text-lg"
                  required
                />
                <button
                  type="submit"
                  className="text-primary p-2 hover:translate-x-1 transition-transform disabled:opacity-50 disabled:translate-x-0"
                  disabled={isSubmittingNewsletter}
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              {newsletterStatus ? (
                <p className={`text-xs font-medium ${newsletterStatusType === 'success' ? 'text-primary' : 'text-destructive'}`} role="status">
                  {newsletterStatus}
                </p>
              ) : null}
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-foreground/30 text-[10px] font-bold tracking-[0.2em]">© 2026 YOUNG FUTURE TECH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <Link to="/privacy" className="text-foreground/30 text-[10px] font-bold tracking-[0.2em] hover:text-primary transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="text-foreground/30 text-[10px] font-bold tracking-[0.2em] hover:text-primary transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
