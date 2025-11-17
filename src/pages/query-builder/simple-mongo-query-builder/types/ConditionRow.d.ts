import type { QueryCondition, Operator } from "../types";

export interface ConditionRowProps {
  condition: QueryCondition;
  operators: Operator[];
  onUpdate: (updates: Partial<QueryCondition>) => void;
  onRemove: () => void;
  canRemove: boolean;
}
