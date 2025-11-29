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

export interface ItemData {
  id: string;
  item_name: string;
  item_type: "Lost" | "Found";
  description: string;
  location: string;
  date: string;
}

interface ItemFormProps {
  onSubmit: (data: Omit<ItemData, "id">) => void;
}

export const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    item_name: "",
    item_type: "" as "Lost" | "Found" | "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.item_type) {
      toast.error("Please select if the item is Lost or Found");
      return;
    }

    onSubmit({
      ...formData,
      item_type: formData.item_type as "Lost" | "Found",
    });

    // Reset form
    setFormData({
      item_name: "",
      item_type: "",
      description: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
    });

    toast.success("Item posted successfully!");
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

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the item (color, brand, distinguishing features)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
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
            />
          </div>

          <Button type="submit" className="w-full">
            Post Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
