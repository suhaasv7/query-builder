import type { QueryGroup as QueryGroupType, Operator } from "../types";

export interface QueryGroupProps {
  group: QueryGroupType;
  groupIndex: number;
  operators: Operator[];
  canRemove: boolean;
  showLogicOperator: boolean;
  onAddCondition: () => void;
  onRemoveCondition: (conditionId: string) => void;
  onUpdateCondition: (
    conditionId: string,
    updates: Partial<QueryGroupType["conditions"][0]>
  ) => void;
  onRemoveGroup: () => void;
  onUpdateLogicOperator: (operator: "AND" | "OR") => void;
}
