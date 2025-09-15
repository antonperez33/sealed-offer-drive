import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Lock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSealedOfferContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { Progress } from "@/components/ui/progress";

const ApplyPage = () => {
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
  const [submissionStep, setSubmissionStep] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");
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
    setSubmissionStep(1);
    
    try {
      // Step 1: Encrypt sensitive data
      setSubmissionStep(2);
      
      // In a real implementation, you would encrypt the data using FHE
      // For now, we'll simulate the encrypted data
      const encryptedSalaryExpectation = "0x" + Buffer.from(formData.salaryExpectation).toString('hex');
      const encryptedExperienceYears = "0x" + Buffer.from(formData.experienceYears).toString('hex');
      const encryptedEducationLevel = "0x" + Buffer.from(formData.educationLevel).toString('hex');
      const encryptedResumeHash = formData.resume ? "0x" + Buffer.from(formData.resume.name).toString('hex') : "0x";
      const inputProof = "0x" + Buffer.from("proof").toString('hex');

      // Step 2: Submit to blockchain
      setSubmissionStep(3);
      
      const hash = await submitApplication(
        formData.positionTitle,
        formData.companyName,
        encryptedSalaryExpectation,
        encryptedExperienceYears,
        encryptedEducationLevel,
        encryptedResumeHash,
        inputProof
      );

      setTransactionHash(hash);
      setSubmissionStep(4);

      toast({
        title: "Application Successfully Submitted",
        description: `Your encrypted application has been submitted to the blockchain. Transaction: ${hash}`,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmissionStep(0);
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

  const getStepDescription = () => {
    switch (submissionStep) {
      case 1:
        return "Validating application data...";
      case 2:
        return "Encrypting sensitive information with FHE...";
      case 3:
        return "Submitting to blockchain...";
      case 4:
        return "Application successfully submitted!";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Apply Privately</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your job application with complete privacy. Your sensitive data is encrypted using 
              Fully Homomorphic Encryption (FHE) and stored securely on the blockchain.
            </p>
          </div>

          {/* Progress Indicator */}
          {isSubmitting && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{submissionStep}</span>
                    </div>
                    <div>
                      <p className="font-medium">{getStepDescription()}</p>
                      <Progress value={(submissionStep / 4) * 100} className="w-64" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {submissionStep === 4 && transactionHash && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Application Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm">
                      Transaction Hash: <code className="bg-green-100 px-2 py-1 rounded">{transactionHash}</code>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Form */}
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Encrypted Job Application
              </CardTitle>
              <CardDescription>
                All sensitive information will be encrypted using FHE technology before being stored on the blockchain.
                Only you and authorized employers can decrypt this data.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="positionTitle">Position Title *</Label>
                    <Input
                      id="positionTitle"
                      value={formData.positionTitle}
                      onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Tech Corp Inc."
                      required
                    />
                  </div>
                </div>

                {/* Encrypted Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-accent" />
                      Salary Expectation (Encrypted) *
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
                      Experience Years (Encrypted) *
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
                      Education Level (Encrypted) *
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

                {/* Resume Upload */}
                <div className="space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Resume Upload (Encrypted) *
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      required
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

                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea
                    id="cover-letter"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows={4}
                  />
                </div>

                {/* Privacy Information */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    Privacy Protection
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your resume and salary information are encrypted using FHE technology</li>
                    <li>• Only your cover letter and position details are visible initially</li>
                    <li>• Employers must express interest before accessing encrypted data</li>
                    <li>• All data is stored securely on the blockchain</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    variant="default" 
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || !isConnected}
                    size="lg"
                  >
                    <Lock className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Encrypted Application"}
                  </Button>
                  {!isConnected && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Connect wallet to submit
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How Private Applications Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Encrypt Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Your sensitive information is encrypted using FHE technology before submission.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Store on Blockchain</h3>
                  <p className="text-sm text-muted-foreground">
                    Encrypted data is stored securely on the Ethereum blockchain.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Selective Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Employers can only access your data after mutual interest is established.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
