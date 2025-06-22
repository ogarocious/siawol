// app/frontend/components/StablePagination.tsx
import React from "react";
import { Group, Button, Text, Box, Flex } from "@mantine/core";

interface PaginationProps {
  total: number;
  value: number;
  onChange: (page: number) => void;
  color?: string;
}

export function StablePagination({
  total,
  value,
  onChange,
  color = "#EA580C",
}: PaginationProps) {
  if (total <= 1) return null;

  // Reduce number of visible pages to keep everything on one row
  const maxVisible = 3; // First page, current area, last page

  // Calculate what pages to show based on current page
  let displayPages: (number | "ellipsis")[] = [];

  // Always show first page
  displayPages.push(1);

  // Show current page and potentially adjacent pages
  if (value > 2) {
    displayPages.push("ellipsis");
  }

  // Current page (unless it's first or last)
  if (value > 1 && value < total) {
    displayPages.push(value);
  }

  // Show ellipsis before last page if needed
  if (value < total - 1) {
    displayPages.push("ellipsis");
  }

  // Always show last page if more than 1 page
  if (total > 1) {
    displayPages.push(total);
  }

  // De-duplicate and ensure proper order
  displayPages = [...new Set(displayPages)].sort((a, b) => {
    if (a === "ellipsis") return 0;
    if (b === "ellipsis") return 0;
    return (a as number) - (b as number);
  });

  return (
    <Flex align="center" gap="xs" style={{ minWidth: 200, maxWidth: 300 }}>
      {/* Previous page button */}
      <Button
        variant="light"
        color={color}
        disabled={value === 1}
        onClick={() => onChange(value - 1)}
        p={0}
        w={40}
        h={40}
        style={{
          flexShrink: 0,
          backgroundColor:
            value === 1 ? "rgba(255, 235, 59, 0.1)" : "rgba(255, 235, 59, 0.2)",
          borderColor: "#ffeb3b",
          color: value === 1 ? "#808080" : "#ffeb3b",
        }}
      >
        &lt;
      </Button>

      {/* Pages - compact display */}
      <Flex justify="center" align="center" gap="xs" style={{ flex: 1 }}>
        {displayPages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <Text key={`ellipsis-${index}`} size="sm" fw={500} c="#b0b0b0">
                ...
              </Text>
            );
          }

          return (
            <Button
              key={index}
              variant={page === value ? "filled" : "subtle"}
              onClick={() => onChange(page as number)}
              p={0}
              w={40}
              h={40}
              radius="sm"
              style={{
                backgroundColor:
                  page === value ? "#ffeb3b" : "rgba(255, 235, 59, 0.1)",
                color: page === value ? "#171717" : "#ffeb3b",
                borderColor: "#ffeb3b",
                "&:hover": {
                  backgroundColor:
                    page === value ? "#ffc107" : "rgba(255, 235, 59, 0.2)",
                },
              }}
            >
              {page}
            </Button>
          );
        })}
      </Flex>

      {/* Next page button */}
      <Button
        variant="light"
        color={color}
        disabled={value === total}
        onClick={() => onChange(value + 1)}
        p={0}
        w={40}
        h={40}
        style={{
          flexShrink: 0,
          backgroundColor:
            value === total
              ? "rgba(255, 235, 59, 0.1)"
              : "rgba(255, 235, 59, 0.2)",
          borderColor: "#ffeb3b",
          color: value === total ? "#808080" : "#ffeb3b",
        }}
      >
        &gt;
      </Button>
    </Flex>
  );
}
