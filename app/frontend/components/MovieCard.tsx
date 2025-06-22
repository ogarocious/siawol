import React, { useState } from "react";
import { Card, Text, Box, Badge, Group, Stack } from "@mantine/core";

interface MovieCardProps {
  title: string;
  year: number;
  director: string;
  country: string;
  countryFlag: string;
  genre: string;
  type?: string;
  length?: string;
  onClick?: () => void;
}

export default function MovieCard({
  title,
  year,
  director,
  country,
  countryFlag,
  genre,
  onClick,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      padding="0"
      radius="md"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        border: "1px solid #3a3a3a",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
        boxShadow: isHovered
          ? "0 8px 32px rgba(255, 235, 59, 0.15), 0 0 0 1px rgba(255, 235, 59, 0.2)"
          : "0 2px 8px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",

        maxWidth: "100%", // Responsive constraint
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Poster Placeholder */}
      <Box
        style={{
          height: "300px",
          background:
            "linear-gradient(45deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #3a3a3a",
        }}
      >
        {/* Overlay on hover */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered
              ? "linear-gradient(45deg, rgba(255, 235, 59, 0.1), rgba(184, 115, 51, 0.1))"
              : "transparent",
            transition: "all 0.3s ease",
          }}
        />

        {/* Poster placeholder text */}
        <Box
          style={{
            zIndex: 1,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
            textAlign: "center",
          }}
        >
          <Text size="sm" c="#808080" ta="center" component="div">
            {title}
          </Text>
          <Text size="xs" c="#606060" component="div" mt="xs">
            POSTER
          </Text>
        </Box>

        {/* Country flag */}
        <Box
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            fontSize: "24px",
            padding: "4px 6px",
          }}
        >
          {countryFlag}
        </Box>
      </Box>

      {/* Movie Information */}
      <Stack gap="xs" p="md">
        {/* Title */}
        <Text
          fw={600}
          size="lg"
          c="#f5f5f5"
          lineClamp={2}
          style={{
            transition: "color 0.3s ease",
            color: isHovered ? "#ffeb3b" : "#f5f5f5",
          }}
        >
          {title}
        </Text>

        {/* Subtitle: Year • Country • Director */}
        <Text
          size="sm"
          c="#b0b0b0"
          style={{
            fontWeight: 300,
            letterSpacing: "0.5px",
          }}
        >
          {year} • {country} • {director}
        </Text>

        {/* Genre tags */}
        <Group gap="xs" mt="xs">
          {genre &&
            genre.split(",").map((g, index) => (
              <Badge
                key={index}
                variant="outline"
                size="sm"
                style={{
                  borderColor: isHovered ? "#b87333" : "#4a4a4a",
                  color: isHovered ? "#b87333" : "#808080",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                {g.trim()}
              </Badge>
            ))}
        </Group>
      </Stack>
    </Card>
  );
}
