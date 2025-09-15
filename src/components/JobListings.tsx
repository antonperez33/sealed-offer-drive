import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, MapPin, Clock, DollarSign } from "lucide-react";
import sealedFolderImg from "@/assets/sealed-folder.png";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salaryRange: "Encrypted until shortlist",
    description: "Build cutting-edge web applications with React and TypeScript. Join our innovative team.",
    applicants: 127,
    tags: ["React", "TypeScript", "GraphQL"]
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Full-time",
    salaryRange: "Encrypted until shortlist",
    description: "Design beautiful, user-centered products that millions of people will love and use.",
    applicants: 89,
    tags: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    type: "Contract",
    salaryRange: "Encrypted until shortlist",
    description: "Scale infrastructure and optimize deployment pipelines for high-growth startup.",
    applicants: 64,
    tags: ["AWS", "Kubernetes", "CI/CD"]
  }
];

const JobListings = () => {
  return (
    <section id="jobs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Private Job Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Apply with confidence. Your information stays sealed until employers express genuine interest.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-gradient-card border-border hover:shadow-elevated transition-smooth group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="font-medium text-muted-foreground">
                      {job.company}
                    </CardDescription>
                  </div>
                  <img 
                    src={sealedFolderImg} 
                    alt="Sealed application" 
                    className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-smooth"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-accent" />
                  <span>Salary: {job.salaryRange}</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {job.applicants} private applications
                  </span>
                  <Button variant="secure" size="sm" className="gap-2">
                    <Lock className="w-4 h-4" />
                    Apply Privately
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Private Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;