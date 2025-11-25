# MongoDB Query Builder

A minimal, functional web application for building MongoDB queries visually. This tool helps you create MongoDB Compass-compatible queries through an intuitive interface without writing JSON manually.

## Features

- **Dual Mode Interface**:
  - **Simple Query Builder**: Visual interface for building standard MongoDB queries
  - **Aggregation Pipeline**: (Coming Soon) Visual builder for complex aggregation pipelines

- **Simple Query Builder**:
  - **Visual Interface**: Build MongoDB queries using a simple form interface
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
  - **Multiple Data Types**: Support for String, Number, Boolean, and Date

- **Query History**:
  - Automatically saves copied queries to localStorage
  - View and manage saved queries
  - Copy saved queries with one click
  - Delete individual queries or clear all at once
  - Real-time updates without page refresh

- **MongoDB Compass Compatible**: Generates queries in the exact format used by MongoDB Compass

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

1. **Navigation**: Use the sidebar to switch between "Simple Query Builder" and "Aggregation Pipeline" modes.

2. **Simple Query Builder**:
   - **Add Parameters**: Use the "Parameters" section to add query conditions
     - Enter the field name
     - Select an operator
     - Choose the value type
     - Enter the value
   - **Add Multiple Conditions**: Click "+ Add Condition" to add more query parameters
   - **View Generated Query**: The MongoDB Compass query appears in the right panel in real-time
   - **Copy Query**: Click the "Copy" button to copy the query to your clipboard. The query is automatically saved to your query history

3. **Manage Saved Queries**:
   - View all previously copied queries below the main panels
   - Click "Copy" on any saved query to copy it again
   - Click "×" to delete individual queries
   - Click "Clear All" to remove all saved queries (with confirmation)

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **Shadcn UI** - UI Components
- **Lucide React** - Icons

## Project Structure

```text
src/
├── components/
│   └── ui/                   # Reusable UI components (Shadcn)
├── pages/
│   └── query-builder/
│       ├── mongo-aggregation/        # Aggregation pipeline feature
│       ├── simple-mongo-query-builder/ # Simple query builder feature
│       │   └── components/           # Feature-specific components
│       └── QueryBuilderPage.tsx      # Main page wrapper
├── hooks/                    # Custom hooks (use-toast, etc.)
├── lib/                      # Utility libraries
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## License

MIT
