import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Star, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import eventMusic from "@/assets/event-music.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventFestival from "@/assets/event-festival.jpg";
import eventConference from "@/assets/event-conference.jpg";

const events = {
  "1": {
    id: 1,
    title: "Cosmic Beats Festival",
    date: "December 15, 2024",
    time: "7:00 PM - 2:00 AM",
    location: "Space Arena, Neo City",
    description: "Join us for an interstellar musical experience featuring top electronic artists from around the galaxy. Dance under the stars with cutting-edge sound and visuals.",
    image: eventMusic,
    attendees: 5420,
    rating: 4.9,
    organizer: "Stellar Events",
    category: "Music"
  },
  "2": {
    id: 2,
    title: "Galactic Sports Championship",
    date: "December 20, 2024",
    time: "3:00 PM - 9:00 PM", 
    location: "Nebula Stadium, Aurora District",
    description: "Witness the ultimate championship featuring athletes from across the cosmos competing in zero-gravity sports and traditional competitions.",
    image: eventSports,
    attendees: 8900,
    rating: 4.8,
    organizer: "Cosmic Sports League",
    category: "Sports"
  }
};

const ticketTiers = [
  {
    id: 1,
    name: "Early Bird",
    price: "0.05 ETH",
    fiatPrice: "$160",
    description: "Limited time offer",
    features: ["General Access", "Digital Commemorative NFT"],
    available: 250,
    total: 500,
    badge: "Limited"
  },
  {
    id: 2,
    name: "General",
    price: "0.1 ETH", 
    fiatPrice: "$320",
    description: "Standard access",
    features: ["General Access", "Digital Commemorative NFT", "Event Merchandise"],
    available: 1200,
    total: 2000,
    badge: ""
  },
  {
    id: 3,
    name: "VIP",
    price: "0.25 ETH",
    fiatPrice: "$800", 
    description: "Premium experience",
    features: ["VIP Access", "Meet & Greet", "Premium NFT Collection", "Exclusive Merchandise", "Priority Support"],
    available: 45,
    total: 100,
    badge: "Premium"
  }
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  
  const event = events[id as keyof typeof events];
  
  if (!event) {
    return <div>Event not found</div>;
  }

  const handleBuyTicket = (tierId: number) => {
    setSelectedTier(tierId);
    // Navigate to purchase flow
    navigate(`/purchase/${event.id}/${tierId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white hover:bg-black/70"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70"
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-primary/90 mb-2">{event.category}</Badge>
          <h1 className="text-2xl font-bold text-white mb-1">{event.title}</h1>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{event.rating}</span>
            <span>•</span>
            <span>{event.organizer}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Event Info */}
        <Card className="cosmic-card">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">{event.attendees.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm">attending</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">5h duration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Ticket Tiers */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle>Select Your Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ticketTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`p-4 rounded-xl border transition-all ${
                  selectedTier === tier.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-card/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{tier.name}</h3>
                    {tier.badge && (
                      <Badge variant="outline" className="text-xs">
                        {tier.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{tier.price}</p>
                    <p className="text-sm text-muted-foreground">{tier.fiatPrice}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                
                <div className="space-y-1 mb-3">
                  {tier.features.map((feature) => (
                    <p key={feature} className="text-xs text-muted-foreground">
                      • {feature}
                    </p>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {tier.available} of {tier.total} available
                  </p>
                  <Button 
                    variant={selectedTier === tier.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBuyTicket(tier.id)}
                    disabled={tier.available === 0}
                  >
                    {tier.available === 0 ? "Sold Out" : "Buy Ticket"}
                  </Button>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1 mt-2">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all"
                    style={{ width: `${((tier.total - tier.available) / tier.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}