import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retryDelay: 500,
      refetchInterval: 3000
    }
  }
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
  );
};
