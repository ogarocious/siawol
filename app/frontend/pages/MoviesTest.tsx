import React from "react";
import { Container, Title, Grid, Stack } from "@mantine/core";
import ApplicationLayout from "../layouts/ApplicationLayout";
import MovieCard from "../components/MovieCard";
import { testMovies } from "../data/movies";

export default function MoviesTest() {
  return (
    <ApplicationLayout>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title order={2} c="#f5f5f5" ta="center">
            International Sci-Fi Movies ({testMovies.length} films)
          </Title>

          <Grid gutter={{ base: "8px", sm: "8px", md: "12px" }}>
            {testMovies.map((movie, index) => (
              <Grid.Col
                key={index}
                span={{ base: 6, xs: 6, sm: 4, md: 3, lg: 2.4, xl: 3 }}
              >
                <MovieCard
                  title={movie.title}
                  year={movie.year}
                  director={movie.director}
                  country={movie.country}
                  countryFlag={movie.countryFlag}
                  genre={movie.genre}
                  onClick={() => console.log(`Clicked: ${movie.title}`)}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </ApplicationLayout>
  );
}
