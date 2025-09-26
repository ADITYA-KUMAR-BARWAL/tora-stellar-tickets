import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import eventMusic from "@/assets/event-music.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventFestival from "@/assets/event-festival.jpg";
import eventConference from "@/assets/event-conference.jpg";

const categories = ["All", "Music", "Sports", "Festivals", "Conferences"];

const events = [
  {
    id: 1,
    title: "Cosmic Beats Festival",
    date: "Dec 15, 2024",
    location: "Space Arena",
    price: "0.1 ETH",
    fiatPrice: "$320",
    category: "Music",
    image: eventMusic,
    attendees: 5420,
    status: "Hot"
  },
  {
    id: 2,
    title: "Galactic Sports Championship",
    date: "Dec 20, 2024", 
    location: "Nebula Stadium",
    price: "0.05 ETH",
    fiatPrice: "$160",
    category: "Sports",
    image: eventSports,
    attendees: 8900,
    status: "Trending"
  },
  {
    id: 3,
    title: "StarLight Festival",
    date: "Jan 5, 2025",
    location: "Aurora Fields",
    price: "0.08 ETH", 
    fiatPrice: "$256",
    category: "Festivals",
    image: eventFestival,
    attendees: 3200,
    status: "New"
  },
  {
    id: 4,
    title: "Future Tech Summit",
    date: "Jan 12, 2025",
    location: "Quantum Center",
    price: "0.03 ETH",
    fiatPrice: "$96", 
    category: "Conferences",
    image: eventConference,
    attendees: 1200,
    status: ""
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Discover Events</h1>
            <p className="text-muted-foreground text-sm">Find your next cosmic experience</p>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 cosmic-card"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Event */}
      {filteredEvents.length > 0 && (
        <Card className="cosmic-card overflow-hidden">
          <div className="relative h-48">
            <img 
              src={filteredEvents[0].image} 
              alt={filteredEvents[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Featured
                </Badge>
                {filteredEvents[0].status && (
                  <Badge variant="outline" className="bg-accent/20 text-accent">
                    {filteredEvents[0].status}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{filteredEvents[0].title}</h3>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {filteredEvents[0].date}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {filteredEvents[0].location}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Events Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <Card className="cosmic-card overflow-hidden hover:scale-105 transition-transform">
                <div className="relative h-32">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {event.status && (
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      {event.status}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{event.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.attendees.toLocaleString()} attending
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{event.price}</p>
                      <p className="text-xs text-muted-foreground">{event.fiatPrice}</p>
                    </div>
                    <Button size="sm" variant="cosmic">
                      Get Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}