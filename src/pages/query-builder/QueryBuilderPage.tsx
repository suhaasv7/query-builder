import { useState } from "react";
import SimpleMongoQueryBuilder from "./simple-mongo-query-builder/components/QueryBuilder";
import MongoAggregation from "./mongo-aggregation/MongoAggregation";
import { Button } from "@/components/ui/button";

type Tab = "simple" | "aggregation";

// Return
export default function QueryBuilderPage() {
  const [activeTab, setActiveTab] = useState<Tab>("simple");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <Button
              variant={activeTab === "simple" ? "default" : "ghost"}
              onClick={() => setActiveTab("simple")}
              className={`rounded-b-none ${
                activeTab === "simple"
                  ? "border-b-2 border-b-primary"
                  : "hover:bg-muted"
              }`}
            >
              Simple Mongo Query Builder
            </Button>
            <Button
              variant={activeTab === "aggregation" ? "default" : "ghost"}
              onClick={() => setActiveTab("aggregation")}
              className={`rounded-b-none ${
                activeTab === "aggregation"
                  ? "border-b-2 border-b-primary"
                  : "hover:bg-muted"
              }`}
            >
              Mongo Aggregation
            </Button>
          </div>
        </div>
      </div>

      <div>
        {activeTab === "simple" && <SimpleMongoQueryBuilder />}
        {activeTab === "aggregation" && <MongoAggregation />}
      </div>
    </div>
  );
}
