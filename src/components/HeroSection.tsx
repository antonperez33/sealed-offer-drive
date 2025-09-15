import { Button } from "@/components/ui/button";
import { Shield, Lock, FileText } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-card rounded-full shadow-elevated">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Apply Privately, <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get Hired Fairly
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your resume and salary expectations stay encrypted until employers shortlist you. 
            Fair hiring powered by privacy-first technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="gap-2">
              <FileText className="w-5 h-5" />
              Browse Private Jobs
            </Button>
            <Button variant="secure" size="lg" className="gap-2">
              <Lock className="w-5 h-5" />
              Start Application
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">Your data encrypted until you're selected</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fair Hiring</h3>
              <p className="text-muted-foreground text-sm">Skills evaluated before personal details</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Better Outcomes</h3>
              <p className="text-muted-foreground text-sm">Higher match quality for both sides</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;