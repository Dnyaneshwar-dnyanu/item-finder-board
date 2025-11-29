
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Image as ImageIcon } from "lucide-react";
import { Item } from "@/lib/firebase"; // Updated import
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const isLost = item.item_type === "Lost";
  
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col",
        isLost ? "border-l-4 border-l-lost bg-lost-light/30" : "border-l-4 border-l-found bg-found-light/30"
      )}
    >
        {/* Image Display for Found Items */}
        {item.imageData && !isLost && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img 
                    src={item.imageData} 
                    alt={`Image of ${item.item_name}`} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
        )}

        {/* Fallback Icon for Found Items without Image */}
        {!item.imageData && !isLost && (
            <div className="aspect-video w-full flex items-center justify-center bg-muted/50 rounded-t-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
        )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{item.item_name}</CardTitle>
          <Badge
            variant={isLost ? "destructive" : "default"}
            className={cn(
              "shrink-0",
              isLost ? "bg-lost hover:bg-lost/90" : "bg-found hover:bg-found/90"
            )}
          >
            {item.item_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{item.description}</p>
        
        <div className="flex flex-col gap-2 pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
