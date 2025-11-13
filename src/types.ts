export type ValueType = "string" | "number" | "boolean" | "date";
export type LogicOperator = "AND" | "OR";

export interface QueryCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  valueType: ValueType;
}

export interface QueryGroup {
  id: string;
  conditions: QueryCondition[];
  logicOperator: LogicOperator;
}

export interface Operator {
  value: string;
  label: string;
}
