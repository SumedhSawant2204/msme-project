"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUpRight, BarChart3, CreditCard, DollarSign, Activity, FileText, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const cashFlowData = [
  { month: 'Jan', inward: 120000, outward: 90000 },
  { month: 'Feb', inward: 135000, outward: 95000 },
  { month: 'Mar', inward: 110000, outward: 85000 },
  { month: 'Apr', inward: 145000, outward: 100000 },
  { month: 'May', inward: 160000, outward: 105000 },
  { month: 'Jun', inward: 190000, outward: 115000 },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MSME Business Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, TechVision Solutions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild><Link href="/apply">Apply for New Loan</Link></Button>
          <Button asChild><Link href="/">Invoice Financing</Link></Button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Business Health Score</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">820</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              +14 points from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹86.4L</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              +12.5% YoY growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹15.0L</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₹4.2L utilised currently
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">Low</div>
            <p className="text-xs text-muted-foreground mt-1">
              Highly favorable for premium rates
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts & Analytics */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Cash Flow Forecasting</CardTitle>
              <CardDescription>Predicted AI inward vs outward flow based on past 6 months GST data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, undefined]}
                    />
                    <Line type="monotone" dataKey="inward" name="Inward (Revenue)" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 0}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="outward" name="Outward (Expenses)" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 0}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel: Active Loans & Actions */}
        <div className="space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Active Facilities</CardTitle>
              <CardDescription>Your current outstanding loans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">Working Capital Term Loan</div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Disbursed on: Jan 12, 2025</div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xl font-bold">₹4,20,000</div>
                  <div className="text-sm">@ 9.5% p.a.</div>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2 mt-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="text-xs text-muted-foreground text-right mt-1">40% Repaid</div>
              </div>

              <div className="border-t border-border pt-4">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>View Repayment Schedule</span>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader pb-2>
              <CardTitle className="flex items-center gap-2">
                 <Zap className="h-5 w-5 text-primary" />
                 Smart Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-4">
                Based on your recent GST filings, you qualify for an instant <strong>Invoice Financing</strong> limit of <strong>₹5,00,000</strong> at 0.75% per month.
              </p>
              <Button className="w-full">Unlock Pre-approved Limit</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
