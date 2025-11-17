export interface SavedQuery {
  id: string;
  query: string;
  title?: string;
  collection?: string;
  timestamp: number;
}

export interface SavedQueriesProps {
  refreshTrigger?: number;
}
