
import { useState, useEffect, useCallback } from "react";
import { ItemForm } from "@/components/ItemForm";
import { ItemBoard } from "@/components/ItemBoard";
import { ClipboardList } from "lucide-react";
import { getAllItems, Item } from "@/lib/firebase"; // Import Firebase functions and type

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all items from Firebase
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const fetchedItems = await getAllItems();
    setItems(fetchedItems);
    setIsLoading(false);
  }, []);

  // OnPageLoad: Fetch items
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary floating" />
            <div>
              <h1 className="text-3xl font-bold text-foreground radiant-text">Lost & Found Board</h1>
              <p className="text-sm text-muted-foreground">
                Help reunite lost items with their owners
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Board Section */}
            <div className="lg:w-2/3">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 radiant-text">Community Board</h2>
                    <p className="text-muted-foreground">
                    Browse through posted items and help make connections
                    </p>
                </div>
                {isLoading ? (
                    <p className="text-center">Loading items...</p>
                ) : (
                    <ItemBoard items={items} />
                )}
            </div>

            {/* Right Column: Form Section (Floating) */}
            <div className="lg:w-1/3 lg:sticky top-28 self-start">
                <ItemForm onItemAdded={fetchItems} />
            </div>
        </div>
      </main>


      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Lost & Found Board - Built with React & TypeScript
        </div>
      </footer>
    </div>
  );
};

export default Index;
