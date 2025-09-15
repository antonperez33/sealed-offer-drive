import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, CheckCircle, UserCheck, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Briefcase,
    title: "Browse Private Jobs",
    description: "Explore opportunities without revealing your identity",
    details: "All job listings show skills requirements while keeping your personal details private"
  },
  {
    icon: Lock,
    title: "Submit Encrypted Application",
    description: "Your resume and salary expectations are sealed",
    details: "Only your skills summary and cover letter are visible to employers initially"
  },
  {
    icon: Eye,
    title: "Employer Reviews Skills",
    description: "Fair evaluation based on qualifications only",
    details: "Employers see your capabilities without bias-inducing personal information"
  },
  {
    icon: UserCheck,
    title: "Get Shortlisted",
    description: "Employer expresses genuine interest",
    details: "Only when you're selected do employers gain access to your full profile"
  },
  {
    icon: Shield,
    title: "Details Unsealed",
    description: "Your private information is revealed",
    details: "Resume, contact details, and salary expectations become accessible"
  },
  {
    icon: CheckCircle,
    title: "Direct Interview",
    description: "Move forward with confidence",
    details: "Both parties know there's genuine mutual interest before proceeding"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Private Applications Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A fair hiring process that protects your privacy while showcasing your skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-elevated transition-smooth group relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;