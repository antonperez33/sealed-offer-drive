import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PrivacyFeatures from "@/components/PrivacyFeatures";
import JobListings from "@/components/JobListings";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <PrivacyFeatures />
      <JobListings />
      <ApplicationForm />
      <Footer />
    </div>
  );
};

export default Index;
