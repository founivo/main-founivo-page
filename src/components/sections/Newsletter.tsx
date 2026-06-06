"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "../ui/Button";

const Newsletter = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div 
          className="rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-[#0F6E56]/10 shadow-2xl shadow-[#0F6E56]/5"
          style={{ background: "#f8faf9" }}
        >
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Syne', sans-serif", color: "#04342C" }}
            >
              Get founder insights <br /> delivered to your inbox
            </motion.h2>
            <p className="text-[#3a6b57] text-lg">
              Join 10,000+ subscribers who get our weekly list of the most promising new founders.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full pl-6 pr-40 py-5 rounded-2xl border border-[#0F6E56]/10 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/5 outline-none transition-all"
              />
              <div className="absolute right-2 top-2 bottom-2">
                <Button className="h-full px-8 bg-[#0F6E56] text-white rounded-xl font-bold flex items-center gap-2">
                  Subscribe <Send size={16} />
                </Button>
              </div>
            </form>
            <p className="mt-4 text-xs text-[#85b5a0] text-center md:text-left">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;