"use client";
import { motion } from "framer-motion";
import { Send, Mail, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const Newsletter = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#E1F5EE] opacity-50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#E1F5EE] opacity-30 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-[#f8faf9] border border-[#0F6E56]/8 p-10 md:p-16 shadow-2xl shadow-[#0F6E56]/5 overflow-hidden"
        >
          {/* Inner Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#0F6E56] opacity-[0.03] blur-[60px]" />

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#E1F5EE] flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Mail size={24} className="text-[#0F6E56]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-syne text-[#04342C]">
                Stay ahead of the curve
              </h2>
              <p className="text-[#3a6b57] text-lg max-w-md">
                Join 10,000+ subscribers. Get weekly founder insights, new additions, and exclusive opportunities delivered to your inbox.
              </p>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full max-w-md">
              <form className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-6 pr-36 py-4 rounded-2xl border border-[#0F6E56]/10 bg-white focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/5 outline-none transition-all text-sm"
                />
                <div className="absolute right-1.5 top-1.5 bottom-1.5">
                  <Button className="h-full px-6 bg-[#0F6E56] text-white rounded-xl font-bold text-sm hover:bg-[#085041] transition-all">
                    Subscribe <Send size={14} />
                  </Button>
                </div>
              </form>
              <p className="mt-4 text-xs text-[#85b5a0] text-center lg:text-left">
                No spam, ever. Unsubscribe in one click. We respect your privacy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
