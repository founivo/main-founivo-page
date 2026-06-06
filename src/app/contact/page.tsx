// src/app/contact/page.tsx
import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: "Contact Us - Founivo",
  description: "Get in touch with Founivo for support, inquiries, or partnership opportunities.",
};

const ContactPage = () => {
  return (
    <div className="py-20">
      <PageWrapper>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,60px)", color: "#04342C", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 20 }}>
            Get in Touch
          </h1>
          <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
            We&apos;re here to help! Whether you have questions, feedback, or need support, feel free to reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#d0ede4]">
            <h2 className="font-['Syne'] font-extrabold text-2xl text-[#04342C] mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#04342C] mb-1">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#04342C] mb-1">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#04342C] mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 p-8 rounded-2xl bg-white shadow-xl border border-[#d0ede4]">
            <h2 className="font-['Syne'] font-extrabold text-2xl text-[#04342C] mb-6">Contact Information</h2>
            <div className="flex items-center gap-4">
              <Mail size={24} color="#0F6E56" />
              <div>
                <h3 className="font-semibold text-lg text-[#04342C]">Email Support</h3>
                <p className="text-sm text-[#3a6b57]">hello@founivo.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} color="#0F6E56" />
              <div>
                <h3 className="font-semibold text-lg text-[#04342C]">Phone (General Inquiries)</h3>
                <p className="text-sm text-[#3a6b57]">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={24} color="#0F6E56" />
              <div>
                <h3 className="font-semibold text-lg text-[#04342C]">Our Office</h3>
                <p className="text-sm text-[#3a6b57]">123 Startup Blvd, Innovation City, CA 90210, USA</p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default ContactPage;