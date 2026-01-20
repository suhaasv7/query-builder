import QueryBuilderPage from "./pages/query-builder/QueryBuilderPage";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";

// Return
function App() {
  return (
    <ThemeProvider>
      <QueryBuilderPage />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
