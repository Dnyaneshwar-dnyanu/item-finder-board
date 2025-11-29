
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { addItem, Item } from "@/lib/firebase"; // Import addItem and Item type

interface ItemFormProps {
  onItemAdded: () => void; // Callback to refresh the item list
}

export const ItemForm = ({ onItemAdded }: ItemFormProps) => {
  const [formData, setFormData] = useState<Omit<Item, 'id' | 'imageUrl'>>({
    item_name: "",
    item_type: "Lost", // Default value
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        // Check for valid image type
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload a valid image file.");
            e.target.value = ''; // Reset the input
            return;
        }
        setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.item_type) {
      toast.error("Please select if the item is Lost or Found");
      return;
    }

    if (formData.item_type === 'Found' && !imageFile) {
        toast.error("Please upload an image for the found item.");
        return;
    }

    setIsSubmitting(true);
    const newItemId = await addItem(formData, imageFile || undefined);
    setIsSubmitting(false);

    if (newItemId) {
      // Reset form
      setFormData({
        item_name: "",
        item_type: "Lost",
        description: "",
        location: "",
        date: new Date().toISOString().split("T")[0],
      });
      setImageFile(null);
      toast.success("Item posted successfully!");
      onItemAdded(); // Trigger refresh
    } else {
      toast.error("Failed to post item. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Post an Item</CardTitle>
        <CardDescription>
          Share details about a lost or found item to help reunite it with its owner
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="item_name">Item Name *</Label>
            <Input
              id="item_name"
              placeholder="e.g., Blue Backpack, iPhone 13"
              value={formData.item_name}
              onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="item_type">Item Type *</Label>
            <Select
              value={formData.item_type}
              onValueChange={(value: "Lost" | "Found") =>
                setFormData({ ...formData, item_type: value })
              }
              required
              disabled={isSubmitting}
            >
              <SelectTrigger id="item_type">
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Lost">Lost</SelectItem>
                <SelectItem value="Found">Found</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Image Upload for 'Found' items */}
          {formData.item_type === 'Found' && (
            <div className="space-y-2">
                <Label htmlFor="item_image">Image of Found Item *</Label>
                <Input 
                    id="item_image" 
                    type="file" 
                    onChange={handleImageChange} 
                    required
                    disabled={isSubmitting}
                    accept="image/*" // Accept only image files
                />
                {imageFile && <p className="text-sm text-muted-foreground">Selected: {imageFile.name}</p>}
            </div>
           )}

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the item (color, brand, distinguishing features)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Where was it lost/found?"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
