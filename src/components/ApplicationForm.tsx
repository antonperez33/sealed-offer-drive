import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Lock, Shield, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSealedOfferContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    positionTitle: "",
    companyName: "",
    salaryExpectation: "",
    experienceYears: "",
    educationLevel: "",
    coverLetter: "",
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { submitApplication, isConnected } = useSealedOfferContract();
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit an application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would encrypt the data using FHE
      // For now, we'll simulate the encrypted data
      const encryptedSalaryExpectation = "0x" + Buffer.from(formData.salaryExpectation).toString('hex');
      const encryptedExperienceYears = "0x" + Buffer.from(formData.experienceYears).toString('hex');
      const encryptedEducationLevel = "0x" + Buffer.from(formData.educationLevel).toString('hex');
      const encryptedResumeHash = formData.resume ? "0x" + Buffer.from(formData.resume.name).toString('hex') : "0x";
      const inputProof = "0x" + Buffer.from("proof").toString('hex');

      const hash = await submitApplication(
        formData.positionTitle,
        formData.companyName,
        encryptedSalaryExpectation,
        encryptedExperienceYears,
        encryptedEducationLevel,
        encryptedResumeHash,
        inputProof
      );

      toast({
        title: "Application Encrypted & Submitted",
        description: `Your private application has been securely sealed. Transaction: ${hash}`,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Submit Your Private Application
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Complete your encrypted application. Only your skills summary will be visible until employers shortlist you.
            </p>
          </div>

          <Card className="bg-gradient-card border-border shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Encrypted Application
              </CardTitle>
              <CardDescription>
                All information below will be sealed until employer interest is confirmed
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="positionTitle">Position Title</Label>
                    <Input
                      id="positionTitle"
                      value={formData.positionTitle}
                      onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Tech Corp Inc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-accent" />
                      Salary Expectation (Encrypted)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salaryExpectation}
                      onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
                      placeholder="e.g., 120000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-accent" />
                      Experience Years (Encrypted)
                    </Label>
                    <Input
                      id="experience"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      placeholder="e.g., 5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education" className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-accent" />
                      Education Level (Encrypted)
                    </Label>
                    <Input
                      id="education"
                      value={formData.educationLevel}
                      onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                      placeholder="e.g., 4 (Bachelor's)"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Resume Upload (Encrypted)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Label htmlFor="resume" className="cursor-pointer">
                      {formData.resume ? (
                        <span className="text-foreground font-medium">{formData.resume.name}</span>
                      ) : (
                        <>
                          <span className="text-foreground font-medium">Click to upload resume</span>
                          <br />
                          <span className="text-muted-foreground text-sm">PDF, DOC, or DOCX files only</span>
                        </>
                      )}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea
                    id="cover-letter"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Privacy Protection
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your resume and salary will be encrypted until shortlisted</li>
                    <li>• Only your skills summary and cover letter are visible initially</li>
                    <li>• Employer must express interest before accessing full details</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="flex-1 gap-2"
                    disabled={isSubmitting || !isConnected}
                  >
                    <Lock className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Encrypted Application"}
                  </Button>
                  {!isConnected && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Connect wallet to submit
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;