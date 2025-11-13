# AI Development Rules for MongoDB Query Builder

This document contains the coding rules and guidelines that must be followed when working on this project.

## Type Safety Rules

### 1. Do Not Use `any` Type

- **Rule**: Never use the `any` type in TypeScript code
- **Reason**: Maintains type safety and prevents runtime errors
- **Example**: Use proper types like `string`, `number`, `QueryGroup`, etc. instead of `any`

### 2. Type Definitions Location

- **Rule**: All types must be defined in their corresponding `.d.ts` file
- **Naming Convention**: The `.d.ts` file name must match the component file name
- **Location**: Place `.d.ts` files in the `src/types/` folder
- **Example**:
  - Component: `src/components/QueryBuilder.tsx`
  - Types: `src/types/QueryBuilder.d.ts`

## File Organization Rules

### 3. Code Arrangement Order

Always arrange code in the following order within each file:

1. **Imports** (see import organization rules below)
2. **References** (if any) - with `// Refs` comment
3. **State declarations** (useState, useReducer, etc.) - with `// States` comment
4. **Constants** (const declarations) - with `// Constants` comment
5. **Functions** (helper functions, event handlers) - with `// Functions` comment
6. **useEffect hooks** (all useEffect hooks together) - with `// useEffect` comment
7. **Return statement** (JSX return) - with `// Return` comment

**Important**: Each section must start with a one-line comment indicating the section name.

**Example Structure:**

```typescript
// 1. Imports
import { useState, useEffect, useRef } from "react";
import type { QueryGroup } from "../types";

// Refs
const inputRef = useRef<HTMLInputElement>(null);

// States
const [queryGroup, setQueryGroup] = useState<QueryGroup>({...});
const [isLoading, setIsLoading] = useState(false);

// Constants
const operators: Operator[] = [...];
const MAX_CONDITIONS = 10;

// Functions
const addCondition = () => {...};
const removeCondition = () => {...};

// useEffect
useEffect(() => {...}, []);

// Return
return <div>...</div>;
```

## Code Quality Rules

### 4. Type Error Checking

- **Rule**: Always check for type errors before completing any changes
- **Action**: Run `read_lints` tool on modified files
- **Requirement**: All type errors must be resolved before marking work as complete

### 5. Import Organization

Arrange imports in the following order:

1. **External imports first** (React, third-party libraries)
2. **Component imports next** (local components)
3. **Type imports** (use `import type` for type-only imports)
4. **Utility imports** (utils, helpers)
5. **Relative imports** (same directory files)

**Example:**

```typescript
// 1. External imports
import { useState, useEffect } from "react";

// 2. Component imports
import Header from "./Header";
import QueryOutput from "./QueryOutput";

// 3. Type imports
import type { QueryGroup, Operator } from "../types";

// 4. Utility imports
import { getMongoCompassQuery } from "../utils/queryBuilder";

// 5. Relative imports (if any)
// None in this example
```

## Summary Checklist

When making changes to the codebase, ensure:

- [ ] No `any` types are used
- [ ] All types are in corresponding `.d.ts` files with matching names
- [ ] Code is arranged in the specified order with section comments (imports → `// Refs` → `// States` → `// Constants` → `// Functions` → `// useEffect` → `// Return`)
- [ ] Type errors are checked and resolved
- [ ] Imports are properly organized (external → components → types → utils → relative)

---

**Note**: These rules should be followed consistently across all files in the project to maintain code quality and consistency.
