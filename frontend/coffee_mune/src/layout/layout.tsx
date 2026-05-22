"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
   return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
};

export default Layout;
