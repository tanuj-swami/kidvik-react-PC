import { X, Bell, Heart, MapPin } from "lucide-react";
import { Button } from "react-bootstrap";
import { useState } from "react";

// interface SchoolCardProps {
//   name: string;
//   location: string;
//   image: string;
// }

const SchoolCard = ({ name, location, image }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  return (
    <div className="relative bg-card rounded-lg shadow-lg overflow-hidden w-full max-w-[300px]">
      {/* School Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-card/90 hover:bg-card rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-base text-card-foreground mb-2 line-clamp-1">
          {name}
        </h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            size="sm"
          >
            View Detail
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`flex-shrink-0 ${
              isNotificationOn 
                ? "bg-accent text-accent-foreground border-accent" 
                : "hover:bg-accent hover:text-accent-foreground hover:border-accent"
            }`}
            onClick={() => setIsNotificationOn(!isNotificationOn)}
            aria-label="Toggle notifications"
          >
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`flex-shrink-0 ${
              isFavorite 
                ? "bg-primary text-primary-foreground border-primary" 
                : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Toggle favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
