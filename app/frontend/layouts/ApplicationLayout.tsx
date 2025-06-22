import React from "react";
import { AppShell, Title, Group, Anchor, Box } from "@mantine/core";
import { Link } from "@inertiajs/react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function ApplicationLayout({ children, title }: Props) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header
        style={{
          background: "linear-gradient(135deg, #171717 0%, #1a1a1a 100%)",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Title
            order={3}
            c="#f5f5f5"
            style={{
              background: "linear-gradient(45deg, #ffeb3b, #b87333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <Anchor
              component={Link}
              href="/"
              underline="never"
              style={{
                background: "linear-gradient(45deg, #ffeb3b, #b87333)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SIAWOL
            </Anchor>
          </Title>
          <Group gap="lg">
            <Anchor
              component={Link}
              href="/"
              c="#e0e0e0"
              style={{
                transition: "color 0.2s ease",
                "&:hover": { color: "#ffeb3b" },
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffeb3b")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#e0e0e0")
              }
            >
              Home
            </Anchor>
            <Anchor
              component={Link}
              href="/movies"
              c="#e0e0e0"
              style={{
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffeb3b")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#e0e0e0")
              }
            >
              Movies
            </Anchor>
            <Anchor
              component={Link}
              href="/videos"
              c="#e0e0e0"
              style={{
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffeb3b")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#e0e0e0")
              }
            >
              Videos
            </Anchor>
            <Anchor
              component={Link}
              href="/about"
              c="#e0e0e0"
              style={{
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffeb3b")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#e0e0e0")
              }
            >
              About
            </Anchor>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main
        style={{
          background: "linear-gradient(135deg, #171717 0%, #1a1a1a 100%)",
          minHeight: "100vh",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
