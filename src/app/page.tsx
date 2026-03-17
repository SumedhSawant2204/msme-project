"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowRight, BarChart3, Clock, FileText, Pickaxe, ShieldCheck, Zap, Users, IndianRupee, Activity } from "lucide-react";
import Link from "next/link";
import { LoanCalculator } from "@/components/ui/LoanCalculator";

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

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Amount Disbursed", value: "₹500Cr+", icon: IndianRupee, color: "text-emerald-500" },
              { label: "Active Businesses", value: "10,000+", icon: Users, color: "text-blue-500" },
              { label: "Approval Rate", value: "94%", icon: Activity, color: "text-primary" },
              { label: "Average Time", value: "24hrs", icon: Clock, color: "text-secondary" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className={`p-3 rounded-xl bg-accent ${stat.color} mb-2`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-accent/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 max-w-6xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose MSMELend?</h2>
            <p className="text-lg text-muted-foreground">Smart lending powered by alternative data and AI.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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
            
            <Card className="bg-background border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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

            <Card className="bg-background border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 w-full relative order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-3xl opacity-50"></div>
              <LoanCalculator />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 space-y-8 order-1 lg:order-2"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 relative max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
          <p className="text-xl opacity-90 mb-10">Join thousands of MSMEs unlocking new growth opportunities with fast credit access.</p>
          <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-xl text-primary font-bold shadow-xl hover:bg-white" asChild>
            <Link href="/apply">
              Start Your Application
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
