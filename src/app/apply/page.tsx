"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ChevronRight, FileUp, Loader2, Maximize, Building2, Landmark, Zap, ShieldCheck, Fingerprint } from "lucide-react";
import Link from "next/link";

import { VideoKyc } from "@/components/ui/VideoKyc";

const steps = [
  { id: 1, name: "Business Details", icon: Building2 },
  { id: 2, name: "Aadhaar eKYC", icon: Fingerprint },
  { id: 3, name: "Financial Data", icon: Landmark },
  { id: 4, name: "Face Match", icon: ShieldCheck },
  { id: 5, name: "Docs & OCR", icon: FileUp },
  { id: 6, name: "Smart Offer", icon: Zap }
];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep < 6) {
      if (currentStep === 1 && !panVerified) return; // Must verify PAN first
      if (currentStep === 3 || currentStep === 5) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(prev => prev + 1);
        }, 2000); // Simulate API connection or OCR processing
      } else if (currentStep !== 4) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Express Business Loan Application</h1>
        <p className="text-muted-foreground text-lg">Complete your application in under 5 minutes without any physical paperwork.</p>
        
        {/* Progress Stepper */}
        <div className="mt-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full overflow-hidden -z-10">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out" 
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center border-4 border-background transition-colors duration-300 ${isActive ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20' : isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground' }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-sm mt-3 font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                     {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative">
        <AnimatePresence mode="wait">
           {isProcessing ? (
             <motion.div 
               key="processing"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
             >
               <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
               <h3 className="text-xl font-semibold">
                 {currentStep === 3 ? "Fetching GST & Banking Insights..." : "Running AI Document Extraction..."}
               </h3>
               <p className="text-muted-foreground mt-2">Please do not close this window.</p>
             </motion.div>
           ) : null}

           {currentStep === 1 && (
             <motion.div
               key="step1"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="p-8 md:p-10"
             >
               <h2 className="text-2xl font-semibold mb-6">Business Details</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label htmlFor="gstin">GSTIN</Label>
                   <Input id="gstin" placeholder="Enter 15-digit GSTIN" defaultValue="27AADCD1234E1Z5" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="pan">Business PAN</Label>
                   <div className="flex gap-2">
                     <Input id="pan" placeholder="Enter PAN" defaultValue="AADCD1234E" />
                     <Button 
                       type="button" 
                       variant={panVerified ? "secondary" : "default"}
                       onClick={() => setPanVerified(true)}
                       className={panVerified ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}
                     >
                       {panVerified ? <CheckCircle2 className="h-4 w-4" /> : "Verify"}
                     </Button>
                   </div>
                 </div>
                 <div className="space-y-2 md:col-span-2">
                   <Label htmlFor="businessName">Registered Business Name (Auto-fetched from NSDL/GSTIN)</Label>
                   <Input id="businessName" value={panVerified ? "TechVision Solutions Limited" : ""} readOnly className="bg-muted/50" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="loanAmount">Desired Loan Amount (₹)</Label>
                   <Input id="loanAmount" placeholder="e.g., 500000" defaultValue="1500000" type="number" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="purpose">Loan Purpose</Label>
                   <select id="purpose" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                     <option>Working Capital</option>
                     <option>Equipment Purchase</option>
                     <option>Expansion</option>
                     <option>Inventory</option>
                   </select>
                 </div>
               </div>
             </motion.div>
           )}

           {currentStep === 2 && (
             <motion.div
               key="step2"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="p-8 md:p-10"
             >
               <h2 className="text-2xl font-semibold mb-6">Aadhaar eKYC</h2>
               <p className="text-muted-foreground mb-8">Verify your Aadhaar using OTP for seamless identity verification and digital signatures later in the process.</p>
               
               <div className="max-w-md mx-auto space-y-6">
                 <div className="space-y-2">
                   <Label htmlFor="aadhaar">Aadhaar Number</Label>
                   <Input id="aadhaar" placeholder="XXXX XXXX XXXX" defaultValue="4231 8293 1029" />
                 </div>
                 
                 <div className="flex items-end gap-2">
                   <div className="space-y-2 flex-1">
                     <Label htmlFor="otp">Enter 6-digit OTP sent to linked mobile number ending in 9812</Label>
                     <Input id="otp" placeholder="Enter OTP" maxLength={6} value={aadhaarOtp} onChange={(e) => setAadhaarOtp(e.target.value)} />
                   </div>
                   <Button variant="outline" className="shrink-0 mb-[1px]">Resend</Button>
                 </div>

                 {aadhaarOtp.length === 6 && (
                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-emerald-700 animate-in fade-in zoom-in duration-300">
                     <CheckCircle2 className="h-5 w-5" />
                     <span className="font-medium">Aadhaar Verified Successfully! UIDAI match confirmed.</span>
                   </div>
                 )}
               </div>
             </motion.div>
           )}

           {currentStep === 3 && (
             <motion.div
               key="step3"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="p-8 md:p-10"
             >
               <h2 className="text-2xl font-semibold mb-6">Financial Data Consent</h2>
               <p className="text-muted-foreground mb-8">We use trusted Government APIs (Account Aggregator framework) to quickly access your data securely.</p>
               
               <div className="space-y-4">
                 <div className="flex items-center p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl">
                   <div className="h-10 w-10 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mr-4">
                     <CheckCircle2 className="h-5 w-5" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-emerald-900 dark:text-emerald-400">GST Registration Verified</h4>
                     <p className="text-sm text-emerald-700 dark:text-emerald-500">GSTR-1 and GSTR-3B filings active.</p>
                   </div>
                   <Badge variant="success">Linked</Badge>
                 </div>

                 <div className="flex items-center p-4 border border-border rounded-xl">
                   <div className="h-10 w-10 bg-muted text-muted-foreground rounded-full flex items-center justify-center mr-4">
                     <Landmark className="h-5 w-5" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold">Bank Account Statement</h4>
                     <p className="text-sm text-muted-foreground">Link via Account Aggregator for past 12 months data.</p>
                   </div>
                   <Button variant="outline" size="sm">Connect Bank</Button>
                 </div>
                 
                 <div className="p-4 bg-accent/50 rounded-lg text-sm text-muted-foreground mt-6">
                   By clicking Next, you provide consent for MSMELend to fetch your GST returns and Bank Statements to generate an AI Risk Score.
                 </div>
               </div>
             </motion.div>
           )}

           {currentStep === 4 && (
             <motion.div
               key="step4"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="p-8 md:p-10"
             >
               <h2 className="text-2xl font-semibold mb-6 text-center">Identity & Face Verification</h2>
               <div className="max-w-xl mx-auto mb-8 text-center text-muted-foreground">
                 To comply with RBI guidelines, we perform a live liveness check and match your face against the previously verified Aadhaar photo.
               </div>
               
               <VideoKyc onComplete={() => setCurrentStep(5)} />
             </motion.div>
           )}

           {currentStep === 5 && (
             <motion.div
               key="step5"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="p-8 md:p-10 text-center"
             >
               <h2 className="text-2xl font-semibold mb-2">Document Processing</h2>
               <p className="text-muted-foreground mb-8">Upload any recent large B2B invoices to boost your limit.</p>
               
               <div 
                 className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 relative overflow-hidden ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:bg-accent/50'} ${files.length > 0 ? 'border-solid border-emerald-500 bg-emerald-500/5' : ''}`}
                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                 onDragLeave={() => setIsDragging(false)}
                 onDrop={(e) => {
                   e.preventDefault();
                   setIsDragging(false);
                   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                     setFiles(Array.from(e.dataTransfer.files).map(f => f.name));
                   }
                 }}
               >
                 {files.length > 0 ? (
                   <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                     <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                       <CheckCircle2 className="h-8 w-8" />
                     </div>
                     <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Files Uploaded</h4>
                     <p className="text-sm text-muted-foreground">{files.join(', ')}</p>
                     <Button variant="outline" size="sm" className="mt-4" onClick={(e) => { e.stopPropagation(); setFiles([]); }}>
                       Remove
                     </Button>
                   </motion.div>
                 ) : (
                   <>
                     <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                       <FileUp className="h-8 w-8" />
                     </div>
                     <div>
                       <h4 className="text-lg font-semibold">Drag & Drop Invoices</h4>
                       <p className="text-sm text-muted-foreground">PDF, JPEG, or PNG up to 10MB</p>
                     </div>
                     <Button variant="secondary" className="mt-4 pointer-events-none">Browse Files</Button>
                   </>
                 )}
               </div>
               <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                 <Maximize className="h-4 w-4" /> OCR technology will automatically extract invoice numbers and amounts.
               </div>
             </motion.div>
           )}

           {currentStep === 6 && (
             <motion.div
               key="step4"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="p-8 md:p-12 text-center"
             >
               <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
                 <Zap className="h-10 w-10" />
               </div>
               <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
               <p className="text-muted-foreground mb-8">Based on our AI assessment of your GST and cash flows, you are pre-approved.</p>
               
               <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 max-w-lg mx-auto mb-8 shadow-inner relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 blur-2xl"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-tr-full -z-10 blur-2xl"></div>
                 
                 <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Approved Limit</div>
                 <motion.div 
                   initial={{ scale: 0.5, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                   className="text-5xl font-extrabold text-foreground mb-6"
                 >
                   ₹12,50,000
                 </motion.div>
                 
                 <div className="grid grid-cols-2 gap-4 text-left border-t border-border pt-6">
                   <div>
                     <div className="text-sm text-muted-foreground">Interest Rate</div>
                     <div className="font-semibold text-lg">1.2% / month</div>
                   </div>
                   <div>
                     <div className="text-sm text-muted-foreground">Repayment Tenure</div>
                     <div className="font-semibold text-lg">Up to 36 months</div>
                   </div>
                   <div className="col-span-2 mt-2">
                     <div className="text-sm text-muted-foreground">Business Health Score</div>
                     <div className="font-semibold text-emerald-600 flex items-center gap-1">Excellent (820) <CheckCircle2 className="h-4 w-4" /></div>
                   </div>
                 </div>
               </div>

               <Button size="lg" className="px-8 py-6 text-lg rounded-xl shadow-lg w-full max-w-lg" asChild>
                 <Link href="/dashboard">
                   Sign e-Agreement & Disburse Funds
                 </Link>
               </Button>
               <p className="text-xs text-muted-foreground mt-4">Funds will be credited to your linked HDFC Bank A/C ending in 4021.</p>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
      
      {currentStep < 6 && currentStep !== 4 && (
        <div className="flex justify-between items-center mt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1 || isProcessing}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isProcessing || (currentStep === 1 && !panVerified) || (currentStep === 2 && aadhaarOtp.length !== 6)}
            className="min-w-[120px]"
          >
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : 
              currentStep === 5 ? "Generate Offer" : (
              <>Next Step <ChevronRight className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
