
import { Item } from "@/lib/firebase"; // Updated import
import { ItemCard } from "./ItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ItemBoardProps {
  items: Item[]; // Updated type
}

export const ItemBoard = ({ items }: ItemBoardProps) => {
  const lostItems = items.filter((item) => item.item_type === "Lost");
  const foundItems = items.filter((item) => item.item_type === "Found");

  const renderItems = (itemList: Item[]) => { // Updated type
    if (itemList.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No items posted in this category.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemList.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="lost">Lost ({lostItems.length})</TabsTrigger>
          <TabsTrigger value="found">Found ({foundItems.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {renderItems(items)}
        </TabsContent>
        
        <TabsContent value="lost" className="mt-0">
          {renderItems(lostItems)}
        </TabsContent>
        
        <TabsContent value="found" className="mt-0">
          {renderItems(foundItems)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
