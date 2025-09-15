import { Shield, Lock, Users, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-foreground">PrivateHire</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The future of fair hiring through privacy-first technology. Apply with confidence.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">How It Works</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Post a Job</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Enterprise</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Contact Sales</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Encrypted Applications</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Fair Selection Process</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Sealed Resumes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 PrivateHire. All rights reserved. Built with privacy-first principles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;