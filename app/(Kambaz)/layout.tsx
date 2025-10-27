"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <KambazNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </Provider>
  );
}
