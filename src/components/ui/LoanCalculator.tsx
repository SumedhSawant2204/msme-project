"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function LoanCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [tenure, setTenure] = useState(12);
  const interestRate = 14; // 14% p.a. approx

  const calculateEMI = (p: number, r: number, n: number) => {
    const rPerMonth = r / 12 / 100;
    const emi = p * rPerMonth * (Math.pow(1 + rPerMonth, n) / (Math.pow(1 + rPerMonth, n) - 1));
    return Math.round(emi);
  };

  const emi = calculateEMI(amount, interestRate, tenure);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - amount;

  return (
    <Card className="bg-background border-border shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] -z-10 blur-3xl"></div>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Calculator className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl">EMI Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Estimate your monthly payments instantly.</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Loan Amount</label>
            <span className="text-lg font-bold text-primary">₹{amount.toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" 
            min="50000" 
            max="5000000" 
            step="50000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹50K</span>
            <span>₹50L</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Tenure (Months)</label>
            <span className="text-lg font-bold text-primary">{tenure} Months</span>
          </div>
          <input 
            type="range" 
            min="3" 
            max="36" 
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3M</span>
            <span>36M</span>
          </div>
        </div>

        <div className="pt-6 border-t border-border grid grid-cols-2 gap-4">
          <motion.div 
            key={emi}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-accent/50 p-4 rounded-xl"
          >
            <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
            <div className="text-2xl font-bold">₹{emi.toLocaleString('en-IN')}</div>
          </motion.div>
          <div className="bg-accent/50 p-4 rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
            <div className="text-xl font-semibold">₹{totalInterest.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <Button className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-primary/25 transition-all" asChild>
          <Link href="/apply">
            Apply for ₹{amount.toLocaleString('en-IN')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
