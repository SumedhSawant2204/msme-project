"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, ShieldCheck, Video, XCircle } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface VideoKycProps {
  onComplete: () => void;
}

export function VideoKyc({ onComplete }: VideoKycProps) {
  const [kycState, setKycState] = useState<"instructions" | "recording" | "analyzing" | "success" | "error">("instructions");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Simulated recording/analysis progress
  useEffect(() => {
    if (kycState === "recording" || kycState === "analyzing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (kycState === "recording") setKycState("analyzing");
            else {
              setKycState("success");
              stopCamera();
            }
            return 0;
          }
          return prev + (kycState === "recording" ? 5 : 10);
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [kycState]);

  const startVerification = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setKycState("recording");
    } catch (err) {
      console.error("Camera access denied or unavailable", err);
      // Fallback to pure simulation if blocked
      setKycState("recording"); 
    }
  };

  useEffect(() => {
    if ((kycState === "recording" || kycState === "analyzing") && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [kycState]);

  return (
    <div className="w-full max-w-xl mx-auto border border-border rounded-2xl overflow-hidden shadow-lg bg-card">
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span>Identity Verification</span>
        </div>
        <Badge variant={kycState === "success" ? "success" : "secondary"}>
          {kycState === "success" ? "Verified" : "Pending"}
        </Badge>
      </div>

      <div className="p-8 aspect-video relative flex flex-col items-center justify-center bg-black/5">
        <AnimatePresence mode="wait">
          {kycState === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Ready for Video KYC?</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2 mb-6 inline-block">
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Ensure you are in a well-lit room.</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Remove glasses or hats.</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Look directly at the camera.</li>
              </ul>
              <div>
                <Button onClick={startVerification} className="w-full sm:w-auto">Start Camera <Video className="ml-2 h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {(kycState === "recording" || kycState === "analyzing") && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white overflow-hidden"
            >
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />

              {/* Simulated UI overlay for a camera feed */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex h-3 w-3 relative mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-mono tracking-wider">REC</span>
              </div>

              {/* Face Guide Bracket */}
              <div className="w-64 h-64 border-2 border-dashed border-white/50 rounded-full relative">
                 {kycState === "recording" && (
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-center w-full">
                     Please look straight into the camera...
                   </div>
                 )}
              </div>

              {/* Progress and Analyzing State Overlay */}
              {kycState === "analyzing" && (
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center">
                  <ShieldCheck className="h-12 w-12 text-white mb-4 animate-pulse" />
                  <div className="text-lg font-semibold mb-2">Analyzing Liveness & Face Match...</div>
                  <div className="text-sm text-white/80 mb-4">Comparing against Aadhaar photo</div>
                  <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-200" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {kycState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-semibold text-emerald-600">Verification Successful</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-4">Your identity has been securely verified.</p>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-800 dark:text-emerald-400 mb-6 mx-auto w-fit flex flex-col gap-1 items-start text-left">
                <div className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4" /> Live Person Detected</div>
                <div className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4" /> Face Recognition Match: <strong>98.4%</strong></div>
                <div className="flex gap-2 items-center"><CheckCircle2 className="h-4 w-4" /> Matched with Aadhaar ID</div>
              </div>

              <Button onClick={onComplete} variant="secondary">Continue Application</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
