import type { QueryGroup } from "../types";

// Functions
export const parseValue = (
  value: string,
  type: string
): string | number | boolean | Date => {
  if (!value.trim()) return "";

  switch (type) {
    case "number":
      return Number(value);
    case "boolean":
      return value.toLowerCase() === "true";
    case "date":
      return new Date(value);
    case "string":
    default:
      return value;
  }
};

export const buildQuery = (queryGroup: QueryGroup): Record<string, unknown> => {
  const query: Record<string, unknown> = {};

  queryGroup.conditions.forEach((condition) => {
    if (condition.field && condition.value) {
      const parsedValue = parseValue(condition.value, condition.valueType);

      if (condition.operator === "$exists") {
        query[condition.field] = {
          $exists: parsedValue === true || parsedValue === "true",
        };
      } else if (
        condition.operator === "$in" ||
        condition.operator === "$nin"
      ) {
        const values = condition.value
          .split(",")
          .map((v) => parseValue(v.trim(), condition.valueType));
        query[condition.field] = { [condition.operator]: values };
      } else if (condition.operator === "$eq") {
        // Use shorthand notation for simple equality: { "field": "value" } instead of { "field": { "$eq": "value" } }
        query[condition.field] = parsedValue;
      } else {
        query[condition.field] = { [condition.operator]: parsedValue };
      }
    }
  });

  return query;
};

export const getMongoCompassQuery = (queryGroup: QueryGroup): string => {
  const query = buildQuery(queryGroup);
  return JSON.stringify(query, null, 2);
};
