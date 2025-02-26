import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface MovieCardProps {
    movie: {
        imdbID: string;
        Title: string;
        Year: string;
        Poster: string;
    };
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                alt={movie.Title}
            />
            <CardContent>
                <Typography variant="h5" component={Link} to={`/movie/${movie.imdbID}`}>
                    {movie.Title}
                </Typography>
                <Typography variant="body2">{movie.Year}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;