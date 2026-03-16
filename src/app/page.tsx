"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowRight, BarChart3, Clock, FileText, Pickaxe, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 font-medium">
              <Zap className="mr-2 h-4 w-4" /> Revolutionizing MSME Credit in India
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8">
              Fast, Paperless Credit for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Growing MSMEs</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-12">
              Get an instant credit decision based on your GST and banking data. No collateral required. Disbursed in 24-48 hours.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary/25 transition-all" asChild>
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl" asChild>
                <Link href="/dashboard">
                  View Demo Dashboard
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose MSMELend?</h2>
            <p className="text-lg text-muted-foreground">Smart lending powered by alternative data and AI.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle>Lightning Fast Approval</CardTitle>
                <CardDescription>
                  Decisions in minutes, not weeks. Fully automated underwriting ensures capital reaches you in 24-48 hours.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-background border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Zero Paperwork</CardTitle>
                <CardDescription>
                  Securely link your GSTIN and bank accounts. Our AI handles the heavy lifting, no manual uploads needed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle>Collateral-Free</CardTitle>
                <CardDescription>
                  We assess your business health using cash flow and tax data, removing the need for traditional collateral.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 w-full relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl opacity-50"></div>
               <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
                 <div className="space-y-6">
                   {[
                     { step: "01", title: "Submit Application", desc: "Enter basic details and amount needed." },
                     { step: "02", title: "Auto-fetch Data", desc: "Connect GST and banking APIs securely." },
                     { step: "03", title: "AI Assessment", desc: "Our engine generates your risk & limit score." },
                     { step: "04", title: "Instant Disbursement", desc: "Sign digitally and get funds." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                       <div className="flex-shrink-0 h-10 w-10 mt-1 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                         {item.step}
                       </div>
                       <div>
                         <h4 className="text-lg font-semibold">{item.title}</h4>
                         <p className="text-muted-foreground">{item.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Designed for speed. <br/> Built for <span className="text-primary">growth.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We've eliminated the traditional bottlenecks. MSMELend integrates directly with the digital public infrastructure to assess your real financial health accurately.
              </p>
              <ul className="space-y-3 mt-6">
                {['No branch visits required', 'Bank-grade security & encryption', 'Flexible repayment schedules'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-secondary" /> 
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
        <div className="container mx-auto px-4 relative max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
          <p className="text-xl opacity-90 mb-10">Join thousands of MSMEs unlocking new growth opportunities with fast credit access.</p>
          <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-xl text-primary font-bold shadow-xl hover:bg-white" asChild>
            <Link href="/apply">
              Start Your Application
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
