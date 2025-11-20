import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SavedQuery, SavedQueriesProps } from "../types/SavedQueries";

// States
export default function SavedQueries({ refreshTrigger }: SavedQueriesProps) {
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQueryId, setEditingQueryId] = useState<string | null>(null);
  const [editingQuery, setEditingQuery] = useState<string>("");

  // Functions
  const deleteQuery = (id: string) => {
    const updated = savedQueries.filter((q) => q.id !== id);
    setSavedQueries(updated);
    localStorage.setItem("mongoQueries", JSON.stringify(updated));
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  const clearAll = () => {
    setSavedQueries([]);
    localStorage.removeItem("mongoQueries");
    setShowModal(false);
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  const copyQuery = (query: string) => {
    navigator.clipboard.writeText(query);
  };

  const startEditingQuery = (query: SavedQuery) => {
    setEditingQueryId(query.id);
    setEditingQuery(query.query);
  };

  const saveQuery = (id: string) => {
    const updated = savedQueries.map((q) =>
      q.id === id ? { ...q, query: editingQuery } : q
    );
    setSavedQueries(updated);
    localStorage.setItem("mongoQueries", JSON.stringify(updated));
    setEditingQueryId(null);
    setEditingQuery("");
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  const cancelEditingQuery = () => {
    setEditingQueryId(null);
    setEditingQuery("");
  };

  const updateTitle = (id: string, title: string) => {
    const updated = savedQueries.map((q) =>
      q.id === id ? { ...q, title: title.trim() || "Untitled" } : q
    );
    setSavedQueries(updated);
    localStorage.setItem("mongoQueries", JSON.stringify(updated));
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  const updateCollection = (id: string, collection: string) => {
    const updated = savedQueries.map((q) =>
      q.id === id ? { ...q, collection: collection.trim() } : q
    );
    setSavedQueries(updated);
    localStorage.setItem("mongoQueries", JSON.stringify(updated));
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  const duplicateQuery = (query: SavedQuery) => {
    const duplicatedQuery: SavedQuery = {
      id: Date.now().toString(),
      query: query.query,
      title: `${query.title || "Untitled"} (Copy)`,
      collection: query.collection || "",
      timestamp: Date.now(),
    };

    const updated = [duplicatedQuery, ...savedQueries];
    // Keep only the latest 10 queries
    const limitedQueries = updated.slice(0, 10);
    setSavedQueries(limitedQueries);
    localStorage.setItem("mongoQueries", JSON.stringify(limitedQueries));
    window.dispatchEvent(new Event("queriesUpdated"));
  };

  // useEffect
  useEffect(() => {
    const loadSavedQueries = () => {
      const saved = localStorage.getItem("mongoQueries");
      if (saved) {
        try {
          setSavedQueries(JSON.parse(saved));
        } catch {
          setSavedQueries([]);
        }
      } else {
        setSavedQueries([]);
      }
    };
    loadSavedQueries();
  }, [refreshTrigger]);

  useEffect(() => {
    const loadSavedQueries = () => {
      const saved = localStorage.getItem("mongoQueries");
      if (saved) {
        try {
          setSavedQueries(JSON.parse(saved));
        } catch {
          setSavedQueries([]);
        }
      } else {
        setSavedQueries([]);
      }
    };

    const handleQueriesUpdated = () => {
      loadSavedQueries();
    };

    window.addEventListener("queriesUpdated", handleQueriesUpdated);
    return () => {
      window.removeEventListener("queriesUpdated", handleQueriesUpdated);
    };
  }, []);

  // Return
  if (savedQueries.length === 0) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xs">Saved Queries</CardTitle>
            <Button
              onClick={() => setShowModal(true)}
              variant="destructive"
              size="sm"
              className="h-7 text-xs"
            >
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedQueries.map((saved) => (
            <div
              key={saved.id}
              className="flex flex-col gap-3 p-3 bg-muted rounded border"
            >
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground mb-1 block">
                    Title
                  </label>
                  <Input
                    value={saved.title || "Untitled"}
                    onChange={(e) => updateTitle(saved.id, e.target.value)}
                    onBlur={(e) => updateTitle(saved.id, e.target.value)}
                    placeholder="Untitled"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground mb-1 block">
                    Collection
                  </label>
                  <Input
                    value={saved.collection || ""}
                    onChange={(e) => updateCollection(saved.id, e.target.value)}
                    onBlur={(e) => updateCollection(saved.id, e.target.value)}
                    placeholder="Collection name"
                    className="h-7 text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  {editingQueryId === saved.id ? (
                    <Textarea
                      value={editingQuery}
                      onChange={(e) => setEditingQuery(e.target.value)}
                      className="bg-[#0a0a0a] text-foreground font-mono text-xs min-h-[120px]"
                      placeholder="MongoDB query"
                    />
                  ) : (
                    <Textarea
                      value={saved.query}
                      readOnly
                      className="bg-[#0a0a0a] text-foreground font-mono text-xs min-h-[120px] cursor-default"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 w-36 flex-shrink-0">
                  {editingQueryId === saved.id ? (
                    <>
                      <Button
                        onClick={() => saveQuery(saved.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs w-full border-white text-white hover:bg-white/10"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEditingQuery}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs w-full border-white text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => startEditingQuery(saved)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-white text-white hover:bg-white/10"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => copyQuery(saved.query)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-white text-white hover:bg-white/10"
                      >
                        Copy
                      </Button>
                      <Button
                        onClick={() => duplicateQuery(saved)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-white text-white hover:bg-white/10"
                      >
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => deleteQuery(saved.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear All Queries</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all saved queries? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={clearAll} variant="destructive" size="sm">
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Functions
export function saveQueryToStorage(
  query: string,
  title?: string,
  collection?: string
): boolean {
  if (!query || query.trim() === "" || query === "{}") {
    return false;
  }

  const saved = localStorage.getItem("mongoQueries");
  let queries: SavedQuery[] = [];

  if (saved) {
    try {
      queries = JSON.parse(saved);
    } catch {
      queries = [];
    }
  }

  // Check if query already exists
  const queryExists = queries.some((q) => q.query === query);
  if (queryExists) {
    return false; // Query already exists, don't add it
  }

  const newQuery: SavedQuery = {
    id: Date.now().toString(),
    query,
    title: title || "Untitled",
    collection: collection || "",
    timestamp: Date.now(),
  };

  queries.unshift(newQuery);
  if (queries.length > 10) {
    queries = queries.slice(0, 10);
  }

  localStorage.setItem("mongoQueries", JSON.stringify(queries));

  window.dispatchEvent(new Event("queriesUpdated"));

  return true; // Query was added
}
