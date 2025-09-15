import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { WalletConnect } from "./WalletConnect";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Sealed Offer Drive</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
              Home
            </Link>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </a>
            <a href="#employers" className="text-muted-foreground hover:text-foreground transition-smooth">
              For Employers
            </a>
            <Link to="/apply" className="text-primary hover:text-primary/80 transition-smooth font-medium">
              Apply Privately
            </Link>
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