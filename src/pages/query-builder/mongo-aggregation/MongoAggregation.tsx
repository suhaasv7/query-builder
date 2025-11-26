import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Info, Plus, Trash2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type StageType =
  | "$match"
  | "$group"
  | "$project"
  | "$sort"
  | "$limit"
  | "$skip"
  | "$unwind"
  | "$lookup";

interface PipelineStage {
  id: string;
  type: StageType;
  config: string; // JSON string for stage configuration
}

const STAGE_OPTIONS: {
  value: StageType;
  label: string;
  description: string;
}[] = [
  {
    value: "$match",
    label: "$match",
    description: "Filter documents",
  },
  {
    value: "$group",
    label: "$group",
    description: "Group documents by field",
  },
  {
    value: "$project",
    label: "$project",
    description: "Select fields to include/exclude",
  },
  {
    value: "$sort",
    label: "$sort",
    description: "Sort documents",
  },
  {
    value: "$limit",
    label: "$limit",
    description: "Limit number of documents",
  },
  {
    value: "$skip",
    label: "$skip",
    description: "Skip number of documents",
  },
  {
    value: "$unwind",
    label: "$unwind",
    description: "Deconstruct array field",
  },
  {
    value: "$lookup",
    label: "$lookup",
    description: "Join with another collection",
  },
];

const STAGE_EXAMPLES: Record<StageType, string> = {
  $match: '{\n  "status": "active",\n  "age": { "$gte": 18 }\n}',
  $group:
    '{\n  "_id": "$category",\n  "total": { "$sum": "$price" },\n  "count": { "$sum": 1 }\n}',
  $project: '{\n  "name": 1,\n  "email": 1,\n  "_id": 0\n}',
  $sort: '{\n  "createdAt": -1,\n  "name": 1\n}',
  $limit: "10",
  $skip: "5",
  $unwind: '"tags"',
  $lookup:
    '{\n  "from": "users",\n  "localField": "userId",\n  "foreignField": "_id",\n  "as": "user"\n}',
};

export default function MongoAggregation() {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const addStage = () => {
    const newStage: PipelineStage = {
      id: Date.now().toString(),
      type: "$match",
      config: "{}",
    };
    setStages([...stages, newStage]);
    setExpandedStages(new Set([...expandedStages, newStage.id]));
  };

  const removeStage = (id: string) => {
    setStages(stages.filter((s) => s.id !== id));
    const newExpanded = new Set(expandedStages);
    newExpanded.delete(id);
    setExpandedStages(newExpanded);
  };

  const updateStage = (id: string, updates: Partial<PipelineStage>) => {
    setStages(stages.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const toggleStage = (id: string) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedStages(newExpanded);
  };

  const loadExample = (stageId: string, stageType: StageType) => {
    updateStage(stageId, { config: STAGE_EXAMPLES[stageType] });
  };

  const generatePipeline = (): string => {
    try {
      const pipeline = stages.map((stage) => {
        let config;
        try {
          if (stage.type === "$limit" || stage.type === "$skip") {
            // For limit and skip, config should be a number
            const num = parseInt(stage.config.trim());
            if (isNaN(num)) return { [stage.type]: 0 };
            return { [stage.type]: num };
          } else if (stage.type === "$unwind") {
            // For unwind, config should be a string (field path)
            const field = stage.config.trim().replace(/^["']|["']$/g, "");
            return { [stage.type]: `$${field}` };
          } else {
            // For other stages, config should be a JSON object
            config = JSON.parse(stage.config);
            return { [stage.type]: config };
          }
        } catch {
          return { [stage.type]: {} };
        }
      });
      return JSON.stringify(pipeline, null, 2);
    } catch {
      return "[]";
    }
  };

  const copyPipeline = () => {
    const pipeline = generatePipeline();
    navigator.clipboard.writeText(pipeline);
    toast({
      title: "Copied!",
      description: "Pipeline copied to clipboard",
    });
  };

  const moveStage = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === stages.length - 1)
    ) {
      return;
    }
    const newStages = [...stages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newStages[index], newStages[targetIndex]] = [
      newStages[targetIndex],
      newStages[index],
    ];
    setStages(newStages);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-foreground">
              MongoDB Aggregation Pipeline Builder
            </h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Info className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-2xl overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>
                    How MongoDB Aggregation Pipeline Works
                  </SheetTitle>
                  <SheetDescription>
                    Learn how to build MongoDB aggregation pipelines
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      MongoDB aggregation pipelines process documents through a
                      series of stages. Each stage transforms the documents as
                      they pass through the pipeline.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Available Stages
                    </h3>
                    <div className="space-y-4">
                      {STAGE_OPTIONS.map((stage) => (
                        <Card key={stage.value} className="p-4">
                          <div className="flex items-start gap-3">
                            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                              {stage.value}
                            </code>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {stage.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {stage.description}
                              </p>
                              <div className="mt-2">
                                <p className="text-xs font-medium mb-1">
                                  Example:
                                </p>
                                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                  <code>
                                    {stage.value === "$limit" ||
                                    stage.value === "$skip"
                                      ? `{ "${stage.value}": ${STAGE_EXAMPLES[stage.value]} }`
                                      : stage.value === "$unwind"
                                        ? `{ "${stage.value}": "$${STAGE_EXAMPLES[stage.value].replace(/^["']|["']$/g, "")}" }`
                                        : `{ "${stage.value}": ${STAGE_EXAMPLES[stage.value]} }`}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">How to Use</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Click "Add Stage" to add a new pipeline stage</li>
                      <li>Select the stage type from the dropdown</li>
                      <li>
                        Configure the stage by entering JSON in the config field
                      </li>
                      <li>
                        Click "Load Example" to see a sample configuration
                      </li>
                      <li>Use the up/down arrows to reorder stages</li>
                      <li>View the generated pipeline in the output section</li>
                      <li>
                        Copy the pipeline to use in MongoDB Compass or your
                        application
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tips</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>
                        Stages are processed in order - place $match early to
                        filter documents first
                      </li>
                      <li>
                        Use $project to limit fields and reduce data transfer
                      </li>
                      <li>
                        $group requires an _id field to specify grouping
                        criteria
                      </li>
                      <li>
                        $sort should come before $limit for predictable results
                      </li>
                      <li>
                        For $limit and $skip, enter just a number (e.g., "10")
                      </li>
                      <li>
                        For $unwind, enter the field path as a string (e.g.,
                        "tags")
                      </li>
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pipeline Stages</h3>
              <Button onClick={addStage} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Stage
              </Button>
            </div>

            {stages.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No stages added yet. Click "Add Stage" to get started.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <Card key={stage.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Stage {index + 1}
                        </span>
                        <Select
                          value={stage.type}
                          onValueChange={(value: StageType) => {
                            updateStage(stage.id, {
                              type: value,
                              config: STAGE_EXAMPLES[value],
                            });
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STAGE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveStage(index, "up")}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveStage(index, "down")}
                          disabled={index === stages.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleStage(stage.id)}
                        >
                          {expandedStages.has(stage.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeStage(stage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {expandedStages.has(stage.id) && (
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Configuration
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadExample(stage.id, stage.type)}
                          >
                            Load Example
                          </Button>
                        </div>
                        {stage.type === "$limit" || stage.type === "$skip" ? (
                          <Input
                            type="number"
                            value={stage.config}
                            onChange={(e) =>
                              updateStage(stage.id, { config: e.target.value })
                            }
                            placeholder="Enter a number"
                          />
                        ) : stage.type === "$unwind" ? (
                          <Input
                            value={stage.config.replace(/^["']|["']$/g, "")}
                            onChange={(e) =>
                              updateStage(stage.id, {
                                config: `"${e.target.value}"`,
                              })
                            }
                            placeholder="Enter field path (e.g., tags)"
                          />
                        ) : (
                          <Textarea
                            value={stage.config}
                            onChange={(e) =>
                              updateStage(stage.id, { config: e.target.value })
                            }
                            placeholder="Enter JSON configuration"
                            className="font-mono text-sm min-h-[120px]"
                          />
                        )}
                        <p className="text-xs text-muted-foreground">
                          {stage.type === "$limit" || stage.type === "$skip"
                            ? "Enter a number"
                            : stage.type === "$unwind"
                              ? "Enter the field path to unwind"
                              : "Enter valid JSON for this stage"}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Pipeline</h3>
              <Button onClick={copyPipeline} size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Card className="p-4">
              <pre className="text-sm font-mono bg-muted p-4 rounded overflow-x-auto max-h-[600px] overflow-y-auto">
                <code>{generatePipeline()}</code>
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
