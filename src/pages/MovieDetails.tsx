import { observer } from "mobx-react-lite";
import { movieStore } from "../stores/movieStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";

const MovieDetails = observer(() => {
    const { imdbID } = useParams();

    useEffect(() => {
        if (imdbID) {
            movieStore.fetchMovieDetails(imdbID);
        }
    }, [imdbID]);

    if (movieStore.isLoading) {
        return <CircularProgress style={{ margin: "20px" }} />;
    }

    if (movieStore.error) {
        return <Typography color="error">{movieStore.error}</Typography>;
    }

    if (!movieStore.selectedMovie) {
        return <Typography>Фильм не найден</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={movieStore.selectedMovie.Poster !== "N/A" ? movieStore.selectedMovie.Poster : "https://via.placeholder.com/300"}
                    alt={movieStore.selectedMovie.Title}
                />
                <CardContent>
                    <Typography variant="h4">{movieStore.selectedMovie.Title}</Typography>
                    <Typography variant="body1">{movieStore.selectedMovie.Plot}</Typography>
                    <Typography variant="body2">Год: {movieStore.selectedMovie.Year}</Typography>
                    <Typography variant="body2">Рейтинг: {movieStore.selectedMovie.imdbRating}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
});

export default MovieDetails;