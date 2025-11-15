import ConditionRow from "./ConditionRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QueryGroupProps } from "../types/QueryGroup";

// Return
export default function QueryGroup({
  group,
  groupIndex: _groupIndex,
  operators,
  canRemove,
  showLogicOperator,
  onAddCondition,
  onRemoveCondition,
  onUpdateCondition,
  onRemoveGroup,
  onUpdateLogicOperator,
}: QueryGroupProps) {
  return (
    <Card className="mb-3">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs">Parameters</CardTitle>
          {canRemove && (
            <Button
              onClick={onRemoveGroup}
              variant="destructive"
              size="sm"
              className="h-6 text-xs"
            >
              Remove
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-4">
        {group.conditions.map((condition) => (
          <ConditionRow
            key={condition.id}
            condition={condition}
            operators={operators}
            onUpdate={(updates) => onUpdateCondition(condition.id, updates)}
            onRemove={() => onRemoveCondition(condition.id)}
            canRemove={group.conditions.length > 1}
          />
        ))}

        <Button
          onClick={onAddCondition}
          variant="secondary"
          size="sm"
          className="w-full h-8 text-xs"
        >
          + Add Condition
        </Button>

        {showLogicOperator && (
          <div className="text-center my-2">
            <Select
              value={group.logicOperator}
              onValueChange={(value) =>
                onUpdateLogicOperator(value as "AND" | "OR")
              }
            >
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
