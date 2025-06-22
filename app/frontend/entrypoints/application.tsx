import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "./application.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// Type assertion for import.meta.glob
const pages = (import.meta as any).glob("../pages/**/*.tsx", { eager: true });

createInertiaApp({
  resolve: (name) => {
    console.log("Looking for page:", name);
    console.log("Available pages:", Object.keys(pages));

    const pagePath = name.endsWith(".tsx")
      ? `../pages/${name}`
      : `../pages/${name}.tsx`;

    const importedPage = pages[pagePath];
    console.log("Trying path:", pagePath);
    console.log("Found page:", !!importedPage);

    return importedPage;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <MantineProvider
        theme={{
          fontFamily: "Open Sans, sans-serif",
          headings: { fontFamily: "Open Sans, sans-serif" },
          colors: {
            dark: [
              "#f5f5f5",
              "#e0e0e0",
              "#b0b0b0",
              "#808080",
              "#4a4a4a",
              "#3a3a3a",
              "#2a2a2a",
              "#1a1a1a",
              "#171717",
              "#0f0f0f",
            ],
            accent: [
              "#fff8e1",
              "#ffeb3b",
              "#ffc107",
              "#ff9800",
              "#ff8c00",
              "#cc5500",
              "#b87333",
              "#8b4513",
              "#654321",
              "#3d2914",
            ],
          },
        }}
        forceColorScheme="dark"
      >
        <Notifications />
        <App {...props} />
      </MantineProvider>
    );
  },
});
