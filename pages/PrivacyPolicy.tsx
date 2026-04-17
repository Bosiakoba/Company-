import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="rounded-none border-foreground text-[10px] font-bold tracking-[0.2em] px-4 py-1 mb-8">
            LEGAL
          </Badge>
          <h1 className="text-6xl lg:text-8xl font-serif italic font-medium leading-[0.9] tracking-tighter mb-16">
            Privacy <span className="text-primary">Policy</span>.
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-12 text-foreground/75 leading-relaxed [&_p]:text-editorial [&_li]:text-editorial">
            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Introduction</h2>
              <p>
                At Young Future Tech, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Information Collection</h2>
              <p>
                We may collect personal information that you voluntarily provide to us, such as your name, email address, and company details when you contact us for a project or subscribe to our newsletter.
              </p>
              <p className="mt-4">
                We also collect non-personal information automatically, such as your IP address, browser type, and usage patterns through cookies and similar technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>To provide and manage our services.</li>
                <li>To communicate with you regarding projects or inquiries.</li>
                <li>To improve our website performance and user experience.</li>
                <li>To send periodic newsletters (you can opt-out at any time).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Third-Party Services</h2>
              <p>
                We do not sell or trade your personal information. We may share data with trusted third-party service providers (such as hosting or analytics) who assist us in operating our business, provided they agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at hello@youngfuture.tech.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <div className="pt-12 border-t border-border mt-20 text-[10px] font-bold tracking-[0.2em] text-foreground/30 uppercase">
              Last Updated: April 7, 2026
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
