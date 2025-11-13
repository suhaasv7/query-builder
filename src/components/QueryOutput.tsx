import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveQueryToStorage } from "./SavedQueries";
import type { QueryOutputProps } from "../types/QueryOutput";

// States
export default function QueryOutput({ query, onCopy }: QueryOutputProps) {
  const [copied, setCopied] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [collection, setCollection] = useState("");
  const { toast } = useToast();

  // Functions
  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);

    // Show copy toast
    toast({
      title: "Copied to clipboard",
      description: "Query has been copied to your clipboard",
    });

    // Check if query is new, if so show save dialog
    const saved = localStorage.getItem("mongoQueries");
    let queries: Array<{ query: string }> = [];

    if (saved) {
      try {
        queries = JSON.parse(saved);
      } catch {
        queries = [];
      }
    }

    const queryExists = queries.some((q) => q.query === query);
    if (!queryExists && query && query.trim() !== "" && query !== "{}") {
      setTitle("");
      setCollection("");
      setShowSaveDialog(true);
    }
  };

  const handleSave = () => {
    const wasAdded = saveQueryToStorage(
      query,
      title.trim() || undefined,
      collection.trim() || undefined
    );
    if (wasAdded) {
      toast({
        title: "Query saved",
        description: "Query has been added to your saved queries",
      });
      setShowSaveDialog(false);
      setTitle("");
      setCollection("");
    }
  };

  // Return
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xs">MongoDB Compass Query</CardTitle>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="h-7 text-xs"
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied</span>
                </>
              ) : (
                "Copy"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-300 p-2 rounded border border-gray-700 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
            {query}
          </pre>
        </CardContent>
      </Card>
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Query</DialogTitle>
            <DialogDescription>
              Enter a title and collection for this query (optional). Title will
              be saved as "Untitled" if left empty.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Title
              </label>
              <Input
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Collection
              </label>
              <Input
                placeholder="Collection name"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSaveDialog(false);
                setTitle("");
                setCollection("");
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
