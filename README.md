# MongoDB Query Builder

A minimal, functional web application for building MongoDB queries visually. This tool helps you create MongoDB Compass-compatible queries through an intuitive interface without writing JSON manually.

## Features

- **Visual Query Builder**: Build MongoDB queries using a simple form interface
- **Multiple Operators**: Support for various MongoDB operators including:
  - Equals (=)
  - Not Equals (!=)
  - Greater Than (>)
  - Greater Than or Equal (>=)
  - Less Than (<)
  - Less Than or Equal (<=)
  - In
  - Not In
  - Regex
  - Exists

- **Multiple Data Types**: Support for different value types:
  - String
  - Number
  - Boolean
  - Date

- **Query History**:
  - Automatically saves copied queries to localStorage
  - View and manage saved queries
  - Copy saved queries with one click
  - Delete individual queries or clear all at once
  - Real-time updates without page refresh

- **MongoDB Compass Compatible**: Generates queries in the exact format used by MongoDB Compass, ready to copy and paste

- **Minimal Design**: Clean, functional interface focused on productivity

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd query-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Add Parameters**: Use the "Parameters" section to add query conditions
   - Enter the field name
   - Select an operator
   - Choose the value type
   - Enter the value

2. **Add Multiple Conditions**: Click "+ Add Condition" to add more query parameters

3. **View Generated Query**: The MongoDB Compass query appears in the right panel in real-time

4. **Copy Query**: Click the "Copy" button to copy the query to your clipboard. The query is automatically saved to your query history

5. **Manage Saved Queries**:
   - View all previously copied queries below the main panels
   - Click "Copy" on any saved query to copy it again
   - Click "×" to delete individual queries
   - Click "Clear All" to remove all saved queries (with confirmation)

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)

## Project Structure

```text
src/
├── components/
│   ├── ConditionRow.tsx      # Individual condition input row
│   ├── Header.tsx            # App header
│   ├── QueryBuilder.tsx       # Main query builder component
│   ├── QueryGroup.tsx        # Query group container
│   ├── QueryOutput.tsx       # Query output display
│   └── SavedQueries.tsx      # Saved queries management
├── types/
│   ├── ConditionRow.d.ts      # Type definitions
│   ├── Header.d.ts
│   ├── QueryBuilder.d.ts
│   ├── QueryGroup.d.ts
│   └── QueryOutput.d.ts
├── utils/
│   └── queryBuilder.ts       # Query building logic
├── types.ts                  # Shared type definitions
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## License

MIT
