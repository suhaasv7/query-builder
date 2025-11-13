import { useState, useEffect } from "react";
import Header from "./Header";
import QueryGroupComponent from "./QueryGroup";
import QueryOutput from "./QueryOutput";
import SavedQueries from "./SavedQueries";
import { Card, CardContent } from "@/components/ui/card";
import type { QueryGroup, Operator } from "../types";
import { getMongoCompassQuery } from "../utils/queryBuilder";

// Constants
const operators: Operator[] = [
  { value: "$eq", label: "Equals (=)" },
  { value: "$ne", label: "Not Equals (!=)" },
  { value: "$gt", label: "Greater Than (>)" },
  { value: "$gte", label: "Greater Than or Equal (>=)" },
  { value: "$lt", label: "Less Than (<)" },
  { value: "$lte", label: "Less Than or Equal (<=)" },
  { value: "$in", label: "In" },
  { value: "$nin", label: "Not In" },
  { value: "$regex", label: "Regex" },
  { value: "$exists", label: "Exists" },
];

// States
export default function QueryBuilder() {
  const [queryGroup, setQueryGroup] = useState<QueryGroup>({
    id: "1",
    conditions: [
      { id: "1", field: "", operator: "$eq", value: "", valueType: "string" },
    ],
    logicOperator: "AND",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Functions
  const addCondition = () => {
    setQueryGroup((group) => ({
      ...group,
      conditions: [
        ...group.conditions,
        {
          id: Date.now().toString(),
          field: "",
          operator: "$eq",
          value: "",
          valueType: "string",
        },
      ],
    }));
  };

  const removeCondition = (conditionId: string) => {
    setQueryGroup((group) => ({
      ...group,
      conditions: group.conditions.filter((c) => c.id !== conditionId),
    }));
  };

  const updateCondition = (
    conditionId: string,
    updates: Partial<QueryGroup["conditions"][0]>
  ) => {
    setQueryGroup((group) => ({
      ...group,
      conditions: group.conditions.map((c) =>
        c.id === conditionId ? { ...c, ...updates } : c
      ),
    }));
  };

  const copyToClipboard = () => {
    const query = getMongoCompassQuery(queryGroup);
    navigator.clipboard.writeText(query);
  };

  // useEffect
  useEffect(() => {
    const handleQueriesUpdated = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener("queriesUpdated", handleQueriesUpdated);
    return () => {
      window.removeEventListener("queriesUpdated", handleQueriesUpdated);
    };
  }, []);

  // Return
  return (
    <div className="min-h-screen bg-background p-4">
      <Header />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardContent className="pt-6">
              <QueryGroupComponent
                group={queryGroup}
                groupIndex={0}
                operators={operators}
                canRemove={false}
                showLogicOperator={false}
                onAddCondition={addCondition}
                onRemoveCondition={removeCondition}
                onUpdateCondition={updateCondition}
                onRemoveGroup={() => {}}
                onUpdateLogicOperator={() => {}}
              />
            </CardContent>
          </Card>

          <QueryOutput
            query={getMongoCompassQuery(queryGroup)}
            onCopy={copyToClipboard}
          />
        </div>

        <SavedQueries refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
