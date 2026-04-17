import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

const TermsOfService = () => {
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
            Terms <span className="text-primary">of Service</span>.
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-12 text-foreground/70 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Terms of Use</h2>
              <p>
                By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Services</h2>
              <p>
                Young Future Tech provides digital transformation services, including but not limited to, web development, mobile app development, brand identity design, and AI automation solutions.
              </p>
              <p className="mt-4">
                We reserve the right to modify or discontinue any part of our services at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Intellectual Property</h2>
              <p>
                All content, designs, and materials on this website are the intellectual property of Young Future Tech unless otherwise stated. You may not reproduce, distribute, or display any part of this site without our prior written consent.
              </p>
              <p className="mt-4">
                Client-specific deliverables are subject to the terms of the individual service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">User Responsibilities</h2>
              <p>
                You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use and enjoyment of the site.
              </p>
              <ul className="list-disc pl-6 space-y-4 mt-6">
                <li>You must not transmit any malicious code or viruses.</li>
                <li>You must not attempt unauthorized access to our systems.</li>
                <li>You must provide accurate information when contacting us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Limitation of Liability</h2>
              <p>
                Young Future Tech is not liable for any direct, indirect, or consequential damages arising from your use of this website or the information contained herein. We provide our services "as is" without any warranties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the jurisdiction in which Young Future Tech operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif italic text-foreground mb-6">Contact Us</h2>
              <p>
                If you have any questions regarding these Terms of Service, please contact us at hello@youngfuture.tech.
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

export default TermsOfService;
