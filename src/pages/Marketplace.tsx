import { useState } from "react";
import { Search, Filter, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import eventMusic from "@/assets/event-music.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventFestival from "@/assets/event-festival.jpg";

const resaleTickets = [
  {
    id: 1,
    eventTitle: "Cosmic Beats Festival",
    date: "Dec 15, 2024",
    originalPrice: "0.25 ETH",
    resalePrice: "0.22 ETH",
    priceChange: -12,
    seller: "0x1234...5678",
    tier: "VIP",
    image: eventMusic,
    priceFloor: "0.20 ETH",
    priceCap: "0.30 ETH",
    verified: true
  },
  {
    id: 2,
    eventTitle: "Galactic Sports Championship",
    date: "Dec 20, 2024", 
    originalPrice: "0.1 ETH",
    resalePrice: "0.09 ETH",
    priceChange: -10,
    seller: "0x9876...1234",
    tier: "General",
    image: eventSports,
    priceFloor: "0.08 ETH",
    priceCap: "0.12 ETH",
    verified: true
  },
  {
    id: 3,
    eventTitle: "StarLight Festival",
    date: "Jan 5, 2025",
    originalPrice: "0.08 ETH", 
    resalePrice: "0.11 ETH",
    priceChange: 37.5,
    seller: "0x5555...9999",
    tier: "Early Bird",
    image: eventFestival,
    priceFloor: "0.06 ETH",
    priceCap: "0.10 ETH",
    verified: false
  }
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("buy");

  const filteredTickets = resaleTickets.filter(ticket =>
    ticket.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Marketplace</h1>
            <p className="text-muted-foreground text-sm">Trade tickets safely & fairly</p>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 cosmic-card"
          />
        </div>
      </div>

      {/* Anti-Scalping Alert */}
      <Alert className="cosmic-card border-accent">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          All resales are price-capped to prevent scalping. Maximum 20% above face value.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 cosmic-card">
          <TabsTrigger value="buy">Buy Tickets</TabsTrigger>
          <TabsTrigger value="sell">Sell Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4 mt-6">
          {/* Market Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="cosmic-card">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-xl font-bold">{filteredTickets.length}</p>
              </CardContent>
            </Card>
            <Card className="cosmic-card">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Avg. Savings</p>
                <p className="text-xl font-bold text-green-400">12%</p>
              </CardContent>
            </Card>
          </div>

          {/* Listings */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="cosmic-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={ticket.image} 
                      alt={ticket.eventTitle}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold truncate">{ticket.eventTitle}</h3>
                          <p className="text-sm text-muted-foreground">{ticket.date}</p>
                        </div>
                        {ticket.verified && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {ticket.tier}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          by {ticket.seller}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-primary">
                              {ticket.resalePrice}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Original: {ticket.originalPrice}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${
                              ticket.priceChange > 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {ticket.priceChange > 0 ? '+' : ''}{ticket.priceChange}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              vs original
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Floor: {ticket.priceFloor}</span>
                          <span>Cap: {ticket.priceCap}</span>
                        </div>

                        <Button 
                          variant="cosmic" 
                          size="sm" 
                          className="w-full"
                          disabled={!ticket.verified}
                        >
                          {ticket.verified ? "Buy Now" : "Pending Verification"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sell" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle>List Your Tickets</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No tickets to sell</h3>
              <p className="text-muted-foreground text-sm mb-4">
                You don't have any transferable tickets in your wallet
              </p>
              <Button variant="cosmic">
                View My Tickets
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}