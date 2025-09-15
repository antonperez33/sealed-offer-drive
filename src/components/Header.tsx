import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { WalletConnect } from "./WalletConnect";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Sealed Offer Drive</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#jobs" className="text-muted-foreground hover:text-foreground transition-smooth">
              Browse Jobs
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </a>
            <a href="#employers" className="text-muted-foreground hover:text-foreground transition-smooth">
              For Employers
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;