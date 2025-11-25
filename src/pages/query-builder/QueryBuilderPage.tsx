import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleMongoQueryBuilder from "./simple-mongo-query-builder/components/QueryBuilder";
import MongoAggregation from "./mongo-aggregation/MongoAggregation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Database, GitBranch } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Tab = "simple" | "aggregation";

// Return
export default function QueryBuilderPage() {
  const [activeTab, setActiveTab] = useState<Tab>("simple");

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-2 py-2">
            <Database className="h-6 w-6" />
            <h2 className="text-lg font-semibold">MongoDB Tools</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("simple")}
                    isActive={activeTab === "simple"}
                  >
                    <Database className="h-4 w-4" />
                    <span>Simple Query Builder</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("aggregation")}
                    isActive={activeTab === "aggregation"}
                  >
                    <GitBranch className="h-4 w-4" />
                    <span>Aggregation Pipeline</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold">
            {activeTab === "simple"
              ? "Simple Query Builder"
              : "Aggregation Pipeline"}
          </h1>
        </header>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "simple" && (
              <motion.div
                key="simple"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <SimpleMongoQueryBuilder />
              </motion.div>
            )}
            {activeTab === "aggregation" && (
              <motion.div
                key="aggregation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <MongoAggregation />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
