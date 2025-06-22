import React from "react";
import { Container, Title, Text, Stack, Box, Grid, Card } from "@mantine/core";
import ApplicationLayout from "../layouts/ApplicationLayout";

export default function Home() {
  return (
    <ApplicationLayout>
      <Container size="lg" py="xl">
        <Stack gap="xl" align="center">
          {/* Hero Section */}
          <Box ta="center" mt="xl">
            <Title
              order={1}
              size="3.5rem"
              fw={700}
              style={{
                background:
                  "linear-gradient(45deg, #ffeb3b 0%, #ffc107 50%, #b87333 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(255, 235, 59, 0.3)",
                letterSpacing: "-0.05em",
              }}
            >
              Sci-Fi Is A Way Of Life
            </Title>

            <Text
              size="xl"
              c="#e0e0e0"
              mt="md"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 300,
              }}
            >
              Your International Sci-Fi Movie Database
            </Text>
          </Box>

          {/* Welcome Message */}
          <Box
            p="xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 235, 59, 0.05) 0%, rgba(184, 115, 51, 0.05) 100%)",
              border: "1px solid rgba(255, 235, 59, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
          >
            <Text
              ta="center"
              size="lg"
              c="#b0b0b0"
              style={{
                lineHeight: 1.6,
                maxWidth: "600px",
              }}
            >
              Welcome to SIAWOL! Discover and explore science fiction movies
              from around the world. From cyberpunk classics to space operas,
              dive into the infinite possibilities of cinema's final frontier.
            </Text>
          </Box>

          {/* Feature Cards */}
          <Grid gutter="lg" mt="xl" w="100%">
            <Grid.Col span={4}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                  border: "1px solid #3a3a3a",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffeb3b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#3a3a3a";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Text fw={600} c="#f5f5f5" mb="xs">
                  Global Cinema
                </Text>
                <Text size="sm" c="#b0b0b0">
                  Explore sci-fi films from every corner of the galaxy
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={4}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                  border: "1px solid #3a3a3a",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffc107";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#3a3a3a";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Text fw={600} c="#f5f5f5" mb="xs">
                  Video Collection
                </Text>
                <Text size="sm" c="#b0b0b0">
                  Watch trailers and clips from your favorite films
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={4}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                  border: "1px solid #3a3a3a",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#b87333";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#3a3a3a";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Text fw={600} c="#f5f5f5" mb="xs">
                  Curated Database
                </Text>
                <Text size="sm" c="#b0b0b0">
                  Detailed information on every sci-fi masterpiece
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </ApplicationLayout>
  );
}
