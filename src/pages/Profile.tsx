import { useState } from "react";
import { User, Wallet, Settings, History, Bell, LogOut, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import mainicascot from "@/assets/maini-mascot.png";

const userStats = [
  { label: "Events Attended", value: "12" },
  { label: "NFTs Owned", value: "8" },
  { label: "Tickets Sold", value: "3" },
];

const recentActivity = [
  {
    id: 1,
    type: "purchase",
    event: "Cosmic Beats Festival",
    date: "2 days ago",
    amount: "0.25 ETH"
  },
  {
    id: 2,
    type: "sale",
    event: "Galactic Sports Championship", 
    date: "1 week ago",
    amount: "0.09 ETH"
  },
  {
    id: 3,
    type: "attended",
    event: "StarLight Festival",
    date: "2 weeks ago",
    amount: ""
  }
];

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { toast } = useToast();

  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarImage src={mainicascot} />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">StarExplorer</h1>
          <p className="text-muted-foreground text-sm">Cosmic Event Enthusiast</p>
          <Badge className="bg-primary/20 text-primary mt-2">Verified</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {userStats.map((stat) => (
          <Card key={stat.label} className="cosmic-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wallet Info */}
      <Card className="cosmic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-muted-foreground font-mono">{truncatedAddress}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm">Balance</span>
            <span className="font-bold text-primary">2.45 ETH</span>
          </div>
          <Button variant="cosmic" className="w-full">
            Add Funds
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="cosmic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{activity.event}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.type === "purchase" && "Purchased ticket"}
                  {activity.type === "sale" && "Sold ticket"}
                  {activity.type === "attended" && "Attended event"}
                  {" • " + activity.date}
                </p>
              </div>
              {activity.amount && (
                <span className="text-sm font-medium text-primary">
                  {activity.amount}
                </span>
              )}
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            View All Activity
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="cosmic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Push Notifications</span>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
          </div>

          <Separator />

          <Button variant="destructive" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}