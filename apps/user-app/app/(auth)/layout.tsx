// src/app/(auth)/layout.tsx
import { ReactNode } from "react";
import PageTransition from "../../components/transitions/PageTransition";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
   
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 via-purple-500/50 to-white">
        {children}
      </div>
    
  );
}
