import Structure from "@/components/Structure";
import "@/styles/cashier.css";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/kitchen.css";
import "@/styles/waiter.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Structure children={<Component {...pageProps} />} />
    </QueryClientProvider>
  );
}
