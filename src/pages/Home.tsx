import { observer } from "mobx-react-lite";
import { movieStore } from "../stores/movieStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Container,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Grid,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import MovieCard from "../components/MovieCard";

const Home = observer(() => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("matrix");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        movieStore.setFilters({ year, type });
        movieStore.fetchMovies(searchQuery);
    }, [searchQuery, year, type]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        movieStore.fetchMovies(searchQuery, page);
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                {t("searchMovies")}
            </Typography>

            <TextField
                label={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                margin="normal"
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>{t("year")}</InputLabel>
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                    <MenuItem value="">{t("any")}</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>{t("type")}</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="">{t("any")}</MenuItem>
                    <MenuItem value="movie">{t("movie")}</MenuItem>
                    <MenuItem value="series">{t("series")}</MenuItem>
                    <MenuItem value="episode">{t("episode")}</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={() => movieStore.fetchMovies(searchQuery)}
                disabled={movieStore.isLoading}
            >
                {t("search")}
            </Button>

            {movieStore.isLoading && <CircularProgress style={{ margin: "20px" }} />}
            {movieStore.error && <Typography color="error">{movieStore.error}</Typography>}

            <Grid container spacing={3} style={{ marginTop: "20px" }}>
                {movieStore.movies.map((movie) => (
                    <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {movieStore.totalResults > 0 && (
                <Pagination
                    count={Math.ceil(movieStore.totalResults / 10)}
                    page={movieStore.currentPage}
                    onChange={handlePageChange}
                    style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
                />
            )}
        </Container>
    );
});

export default Home;