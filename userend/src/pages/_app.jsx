import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Structure from "../components/Structure";
import "../styles/cashier.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/kitchen.css";
import "../styles/password.css";
import "../styles/waiter.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Structure>
        <Component {...pageProps} />
      </Structure>
    </QueryClientProvider>
  );
}
