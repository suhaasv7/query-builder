import QueryBuilderPage from "./pages/query-builder/QueryBuilderPage";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Return
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="query-builder-ui-theme">
      <div className="relative min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <QueryBuilderPage />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
