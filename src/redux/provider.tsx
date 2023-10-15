"use client"

import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {ReactNode} from "react";
import Layout from "@/components/layout/Layout";

export function Providers({children}: { children: ReactNode }) {
  return <Provider store={store}>
    <Layout>
      {children}
    </Layout>
  </Provider>;
}