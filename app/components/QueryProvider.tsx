"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [query] = useState(() => new QueryClient());
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
