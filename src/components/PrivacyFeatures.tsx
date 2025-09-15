import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, DollarSign, FileText, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Your personal data is encrypted using military-grade security",
    benefit: "Complete privacy protection"
  },
  {
    icon: Eye,
    title: "Bias-Free Screening",
    description: "Employers see skills first, personal details only after interest",
    benefit: "Fair evaluation process"
  },
  {
    icon: DollarSign,
    title: "Salary Privacy",
    description: "Your expectations stay private until mutual interest is confirmed",
    benefit: "Better negotiation position"
  },
  {
    icon: FileText,
    title: "Resume Protection",
    description: "Full resume details revealed only to serious employers",
    benefit: "Prevents data harvesting"
  },
  {
    icon: Lock,
    title: "Selective Access",
    description: "You control when and to whom your information is revealed",
    benefit: "Complete control over privacy"
  },
  {
    icon: Users,
    title: "Verified Employers",
    description: "All employers are verified before accessing private applications",
    benefit: "Safe application environment"
  }
];

const PrivacyFeatures = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Privacy, Guaranteed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced privacy features that put you in control of your job search
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-elevated transition-smooth group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-accent">
                    ✓ {feature.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyFeatures;