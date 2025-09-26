import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Smartphone, Star } from "lucide-react";
import mainicascot from "@/assets/maini-mascot.png";

export default function Onboarding() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (email) {
      localStorage.setItem("userEmail", email);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Mascot & Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={mainicascot} 
              alt="Maini the Star Mascot" 
              className="w-24 h-24 animate-float"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">TORA</h1>
            <p className="text-muted-foreground">NFT Event Ticketing Reimagined</p>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="text-center text-xl">Welcome to the Future</CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              Secure, authentic, and transferable event tickets powered by blockchain
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cosmic-card"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                variant="cosmic" 
                size="lg" 
                className="w-full"
                onClick={handleGetStarted}
                disabled={!email}
              >
                <Mail className="w-4 h-4" />
                Get Started with Email
              </Button>
              
              <Button variant="neon" size="lg" className="w-full">
                <Smartphone className="w-4 h-4" />
                Continue with Phone
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center space-y-1">
                <Star className="w-6 h-6 text-primary mx-auto" />
                <p className="text-xs text-muted-foreground">Authentic</p>
              </div>
              <div className="text-center space-y-1">
                <Star className="w-6 h-6 text-accent mx-auto" />
                <p className="text-xs text-muted-foreground">Secure</p>
              </div>
              <div className="text-center space-y-1">
                <Star className="w-6 h-6 text-primary mx-auto" />
                <p className="text-xs text-muted-foreground">Transferable</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}