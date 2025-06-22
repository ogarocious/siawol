import React, { useState, useMemo } from "react";
import {
  Container,
  Title,
  Grid,
  Stack,
  TextInput,
  Group,
  ActionIcon,
  Badge,
  Box,
  Loader,
  Text,
  Drawer,
  MultiSelect,
  RangeSlider,
  Button,
  Divider,
} from "@mantine/core";
import { IconSearch, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import ApplicationLayout from "../layouts/ApplicationLayout";
import MovieCard from "../components/MovieCard";
import { StablePagination } from "../components/StablePagination";
import { movies, Movie } from "../data/movies";

interface FilterState {
  genres: string[];
  countries: string[];
  yearRange: [number, number];
}

const MOVIES_PER_PAGE = 20;

export default function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    countries: [],
    yearRange: [1950, 2020], // Adjust range based on your data
  });

  // Working filter states (for drawer)
  const [workingFilters, setWorkingFilters] = useState<FilterState>({
    genres: [],
    countries: [],
    yearRange: [1950, 2020],
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Generate filter options from movie data
  const filterOptions = useMemo(() => {
    const allGenres = new Set<string>();
    const allCountries = new Set<string>();

    movies.forEach((movie) => {
      // Extract genres
      if (movie.genre) {
        movie.genre.split(",").forEach((genre) => {
          allGenres.add(genre.trim());
        });
      }

      // Extract countries
      if (movie.country) {
        allCountries.add(movie.country);
      }
    });

    return {
      genres: Array.from(allGenres).map((genre) => ({
        value: genre,
        label: genre,
      })),
      countries: Array.from(allCountries).map((country) => ({
        value: country,
        label: `${
          movies.find((m) => m.country === country)?.countryFlag
        } ${country}`,
      })),
    };
  }, []);

  // Simulate search debouncing
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setIsSearching(true);
    setCurrentPage(1); // Reset to first page on search

    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    let result = movies;

    // Apply text search
    if (searchInput.trim()) {
      const searchTerm = searchInput.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm) ||
          movie.director.toLowerCase().includes(searchTerm) ||
          movie.country.toLowerCase().includes(searchTerm) ||
          movie.genre.toLowerCase().includes(searchTerm) ||
          movie.year.toString().includes(searchTerm) ||
          (movie.synopsis && movie.synopsis.toLowerCase().includes(searchTerm))
      );
    }

    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter((movie) => {
        const movieGenres = movie.genre.split(",").map((g) => g.trim());
        return filters.genres.some((selectedGenre) =>
          movieGenres.includes(selectedGenre)
        );
      });
    }

    // Apply country filter
    if (filters.countries.length > 0) {
      result = result.filter((movie) =>
        filters.countries.includes(movie.country)
      );
    }

    // Apply year range filter
    result = result.filter(
      (movie) =>
        movie.year >= filters.yearRange[0] && movie.year <= filters.yearRange[1]
    );

    return result;
  }, [searchInput, filters]);

  // Paginated movies
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const startItem = (currentPage - 1) * MOVIES_PER_PAGE + 1;
  const endItem = Math.min(
    currentPage * MOVIES_PER_PAGE,
    filteredMovies.length
  );

  // Calculate active filter count
  const activeFilterCount =
    filters.genres.length +
    filters.countries.length +
    (filters.yearRange[0] !== 1950 || filters.yearRange[1] !== 2020 ? 1 : 0);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Apply filters from drawer
  const applyFilters = () => {
    setFilters({ ...workingFilters });
    setCurrentPage(1); // Reset to first page when filters change
    setFilterDrawerOpened(false);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      genres: [],
      countries: [],
      yearRange: [1950, 2020] as [number, number],
    };
    setWorkingFilters(clearedFilters);
    setFilters(clearedFilters);
    setCurrentPage(1); // Reset to first page
  };

  // Open drawer with current filters
  const openFilterDrawer = () => {
    setWorkingFilters({ ...filters });
    setFilterDrawerOpened(true);
  };

  return (
    <ApplicationLayout>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Box ta="center">
            <Title
              order={1}
              size="2.5rem"
              style={{
                background:
                  "linear-gradient(45deg, #ffeb3b 0%, #ffc107 50%, #b87333 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sci-Fi Movie Database
            </Title>
            <Text c="#b0b0b0" size="lg" mt="sm">
              Explore {movies.length} international science fiction films
            </Text>
          </Box>

          {/* Search Bar */}
          <Group justify="apart" mb="md">
            <TextInput
              placeholder={
                searchInput
                  ? undefined
                  : "Search movies, directors, countries, genres..."
              }
              value={searchInput}
              onChange={(e) => handleSearchChange(e.currentTarget.value)}
              style={{ flex: 1 }}
              styles={{
                input: {
                  backgroundColor: "#2a2a2a",
                  borderColor: "#4a4a4a",
                  color: "#f5f5f5",
                  "&:focus": {
                    borderColor: "#ffeb3b",
                  },
                  "&::placeholder": {
                    color: "#808080",
                  },
                },
              }}
              leftSection={<IconSearch size={16} color="#b0b0b0" />}
              rightSection={isSearching && <Loader size="xs" color="#ffeb3b" />}
            />

            <Box pos="relative">
              <ActionIcon
                variant="light"
                size="xl"
                style={{
                  backgroundColor: "rgba(255, 235, 59, 0.1)",
                  borderColor: "#ffeb3b",
                  color: "#ffeb3b",
                }}
                onClick={openFilterDrawer}
              >
                <IconAdjustmentsHorizontal />
              </ActionIcon>
              {activeFilterCount > 0 && (
                <Badge
                  color="#ffeb3b"
                  size="sm"
                  radius="xl"
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    backgroundColor: "#ffeb3b",
                    color: "#171717",
                  }}
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Box>
          </Group>

          {/* Results Info and Pagination */}
          <Group justify="apart" align="center">
            <Text c="#b0b0b0" size="sm">
              {searchInput || activeFilterCount > 0
                ? `Found ${filteredMovies.length} movie${
                    filteredMovies.length !== 1 ? "s" : ""
                  }`
                : `Showing all ${movies.length} movies`}
              {filteredMovies.length > 0 && (
                <Text component="span" c="#808080">
                  {" "}
                  • Page {currentPage} of {totalPages} • Showing {startItem}-
                  {endItem}
                </Text>
              )}
            </Text>

            {totalPages > 1 && (
              <StablePagination
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
                color="#ffeb3b"
              />
            )}
          </Group>

          {/* Movies Grid */}
          <Grid gutter="sm">
            {paginatedMovies.map((movie, index) => (
              <Grid.Col
                key={`${movie.title}-${index}`} // Better key for pagination
                span={{ base: 6, xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
              >
                <MovieCard
                  title={movie.title}
                  year={movie.year}
                  director={movie.director}
                  country={movie.country}
                  countryFlag={movie.countryFlag}
                  genre={movie.genre}
                  type={movie.type}
                  length={movie.length}
                  onClick={() => console.log(`Clicked: ${movie.title}`)}
                />
              </Grid.Col>
            ))}
          </Grid>

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <Group justify="center" mt="xl">
              <StablePagination
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
                color="#ffeb3b"
              />
            </Group>
          )}

          {/* No Results */}
          {filteredMovies.length === 0 &&
            (searchInput || activeFilterCount > 0) && (
              <Box ta="center" py="xl">
                <Text c="#808080" size="lg">
                  No movies found matching your criteria
                </Text>
                <Text c="#606060" size="sm" mt="xs">
                  Try adjusting your search terms or filters
                </Text>
              </Box>
            )}
        </Stack>

        {/* Filter Drawer - Same as before */}
        <Drawer
          opened={filterDrawerOpened}
          onClose={() => setFilterDrawerOpened(false)}
          position="right"
          size={isMobile ? "85%" : "md"}
          styles={{
            root: { zIndex: 1000 },
            header: {
              background: "linear-gradient(135deg, #171717 0%, #1a1a1a 100%)",
              color: "#f5f5f5",
              borderBottom: "1px solid #3a3a3a",
            },
            body: {
              background: "linear-gradient(135deg, #171717 0%, #1a1a1a 100%)",
              color: "#f5f5f5",
              minHeight: "100vh",
            },
            close: {
              color: "#f5f5f5",
              "&:hover": {
                backgroundColor: "rgba(255, 235, 59, 0.1)",
                color: "#ffeb3b",
              },
            },
          }}
          title={
            <Text fw={600} size="lg" c="#f5f5f5">
              Filter Movies
            </Text>
          }
        >
          <Stack gap="lg" p="md">
            {/* Genre Filter */}
            <Box>
              <Text fw={500} mb="xs" c="#f5f5f5">
                Genres
              </Text>
              <MultiSelect
                data={filterOptions.genres}
                value={workingFilters.genres}
                onChange={(value) =>
                  setWorkingFilters((prev) => ({ ...prev, genres: value }))
                }
                placeholder="Select genres..."
                clearable
                searchable
                styles={{
                  input: {
                    backgroundColor: "#2a2a2a",
                    borderColor: "#4a4a4a",
                    color: "#f5f5f5",
                    "&:focus": { borderColor: "#ffeb3b" },
                  },
                  dropdown: {
                    backgroundColor: "#2a2a2a",
                    borderColor: "#4a4a4a",
                  },
                  option: {
                    color: "#f5f5f5",
                    "&[data-selected]": {
                      backgroundColor: "rgba(255, 235, 59, 0.2)",
                      color: "#ffeb3b",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255, 235, 59, 0.1)",
                    },
                  },
                }}
              />
            </Box>

            {/* Country Filter */}
            <Box>
              <Text fw={500} mb="xs" c="#f5f5f5">
                Countries
              </Text>
              <MultiSelect
                data={filterOptions.countries}
                value={workingFilters.countries}
                onChange={(value) =>
                  setWorkingFilters((prev) => ({ ...prev, countries: value }))
                }
                placeholder="Select countries..."
                clearable
                searchable
                styles={{
                  input: {
                    backgroundColor: "#2a2a2a",
                    borderColor: "#4a4a4a",
                    color: "#f5f5f5",
                    "&:focus": { borderColor: "#ffeb3b" },
                  },
                  dropdown: {
                    backgroundColor: "#2a2a2a",
                    borderColor: "#4a4a4a",
                  },
                  option: {
                    color: "#f5f5f5",
                    "&[data-selected]": {
                      backgroundColor: "rgba(255, 235, 59, 0.2)",
                      color: "#ffeb3b",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255, 235, 59, 0.1)",
                    },
                  },
                }}
              />
            </Box>

            {/* Year Range Filter */}
            <Box>
              <Text fw={500} mb="xs" c="#f5f5f5">
                Year Range: {workingFilters.yearRange[0]} -{" "}
                {workingFilters.yearRange[1]}
              </Text>
              <RangeSlider
                min={1950}
                max={2020}
                value={workingFilters.yearRange}
                onChange={(value) =>
                  setWorkingFilters((prev) => ({ ...prev, yearRange: value }))
                }
                marks={[
                  { value: 1950, label: "1950" },
                  { value: 1980, label: "1980" },
                  { value: 2000, label: "2000" },
                  { value: 2020, label: "2020" },
                ]}
                styles={{
                  track: { backgroundColor: "#4a4a4a" },
                  bar: { backgroundColor: "#ffeb3b" },
                  thumb: {
                    backgroundColor: "#ffeb3b",
                    borderColor: "#ffeb3b",
                  },
                  mark: {
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                  },
                  markLabel: { color: "#b0b0b0" },
                }}
              />
            </Box>

            <Divider color="#3a3a3a" />

            {/* Action Buttons */}
            <Group gap="md">
              <Button
                variant="outline"
                fullWidth
                onClick={clearFilters}
                styles={{
                  root: {
                    borderColor: "#4a4a4a",
                    color: "#b0b0b0",
                    "&:hover": {
                      borderColor: "#ffeb3b",
                      color: "#ffeb3b",
                      backgroundColor: "rgba(255, 235, 59, 0.1)",
                    },
                  },
                }}
              >
                Clear All
              </Button>
              <Button
                fullWidth
                onClick={applyFilters}
                styles={{
                  root: {
                    background: "linear-gradient(45deg, #ffeb3b, #ffc107)",
                    color: "#171717",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(45deg, #ffc107, #b87333)",
                    },
                  },
                }}
              >
                Apply Filters
              </Button>
            </Group>
          </Stack>
        </Drawer>
      </Container>
    </ApplicationLayout>
  );
}
