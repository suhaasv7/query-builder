import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ConditionRowProps } from "../types/ConditionRow";

// Return
export default function ConditionRow({
  condition,
  operators,
  onUpdate,
  onRemove,
  canRemove,
}: ConditionRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_2fr_auto] gap-2 mb-2 items-center">
      <Input
        type="text"
        value={condition.field}
        onChange={(e) => onUpdate({ field: e.target.value })}
        placeholder="Field name"
        className="h-8 text-xs"
      />
      <Select
        value={condition.operator}
        onValueChange={(value) => onUpdate({ operator: value })}
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {operators.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={condition.valueType}
        onValueChange={(value) =>
          onUpdate({
            valueType: value as "string" | "number" | "boolean" | "date",
          })
        }
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="string">String</SelectItem>
          <SelectItem value="number">Number</SelectItem>
          <SelectItem value="boolean">Boolean</SelectItem>
          <SelectItem value="date">Date</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={condition.value}
        onChange={(e) => onUpdate({ value: e.target.value })}
        placeholder={
          condition.operator === "$in" || condition.operator === "$nin"
            ? "Comma-separated values"
            : "Value"
        }
        className="h-8 text-xs"
      />
      {canRemove && (
        <Button
          onClick={onRemove}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          ×
        </Button>
      )}
    </div>
  );
}
