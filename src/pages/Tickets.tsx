import { useState } from "react";
import { QrCode, Send, MoreVertical, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import eventMusic from "@/assets/event-music.jpg";
import eventSports from "@/assets/event-sports.jpg";

const tickets = [
  {
    id: 1,
    eventTitle: "Cosmic Beats Festival",
    date: "Dec 15, 2024",
    time: "7:00 PM",
    location: "Space Arena",
    image: eventMusic,
    tier: "VIP",
    status: "Active",
    qrCode: "QR12345",
    price: "0.25 ETH",
    seat: "VIP Section A, Row 1",
    transferable: true
  },
  {
    id: 2,
    eventTitle: "Galactic Sports Championship", 
    date: "Dec 20, 2024",
    time: "3:00 PM",
    location: "Nebula Stadium",
    image: eventSports,
    tier: "General",
    status: "Active", 
    qrCode: "QR67890",
    price: "0.1 ETH",
    seat: "Section B, Row 15, Seat 8",
    transferable: true
  },
  {
    id: 3,
    eventTitle: "StarLight Festival",
    date: "Nov 10, 2024",
    time: "6:00 PM", 
    location: "Aurora Fields",
    image: eventMusic,
    tier: "Early Bird",
    status: "Used",
    qrCode: "QR11111",
    price: "0.05 ETH",
    seat: "General Admission",
    transferable: false
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-500/20 text-green-400";
    case "Used": return "bg-gray-500/20 text-gray-400";
    case "Expired": return "bg-red-500/20 text-red-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

export default function Tickets() {
  const [selectedTab, setSelectedTab] = useState("active");
  
  const filteredTickets = tickets.filter(ticket => {
    if (selectedTab === "active") return ticket.status === "Active";
    if (selectedTab === "used") return ticket.status === "Used";
    if (selectedTab === "expired") return ticket.status === "Expired";
    return true;
  });

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold gradient-text">My Tickets</h1>
        <p className="text-muted-foreground text-sm">Your NFT event tickets collection</p>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 cosmic-card">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="used">Used</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {filteredTickets.length === 0 ? (
            <Card className="cosmic-card">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No tickets found</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedTab === "active" 
                    ? "You don't have any active tickets yet" 
                    : "No tickets in this category"}
                </p>
                <Button variant="cosmic">
                  Explore Events
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="cosmic-card overflow-hidden">
                  <div className="relative">
                    {/* Ticket Header */}
                    <div className="flex items-start gap-4 p-4">
                      <div className="relative">
                        <img 
                          src={ticket.image} 
                          alt={ticket.eventTitle}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <Badge 
                          className={`absolute -top-1 -right-1 text-xs ${getStatusColor(ticket.status)}`}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{ticket.eventTitle}</h3>
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {ticket.date} at {ticket.time}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {ticket.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {ticket.tier}
                          </Badge>
                          <span className="text-xs text-primary font-medium">
                            {ticket.price}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Ticket Details */}
                    {ticket.status === "Active" && (
                      <div className="px-4 pb-4">
                        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Seat</span>
                            <span className="text-sm font-medium">{ticket.seat}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">QR Code</span>
                            <span className="text-sm font-mono">{ticket.qrCode}</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          <Button variant="default" size="sm" className="flex-1">
                            <QrCode className="w-4 h-4 mr-2" />
                            Show QR
                          </Button>
                          {ticket.transferable && (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Send className="w-4 h-4 mr-2" />
                              Transfer
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}