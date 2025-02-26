import { makeAutoObservable } from "mobx";

class MovieStore {
    movies: any[] = [];
    selectedMovie: any = null;
    isLoading: boolean = false;
    error: string | null = null;
    currentPage: number = 1;
    totalResults: number = 0;
    filters: { year?: string; type?: string } = {};

    constructor() {
        makeAutoObservable(this);
    }

    setFilters(filters: { year?: string; type?: string }) {
        this.filters = filters;
    }

    async fetchMovies(searchQuery: string = "matrix", page: number = 1) {
        this.isLoading = true;
        this.error = null;

        try {
            const { year, type } = this.filters;
            const url = `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&y=${year || ""}&type=${type || ""}&apikey=bdf20dcb`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                this.movies = data.Search;
                this.totalResults = parseInt(data.totalResults);
                this.currentPage = page;
            } else {
                this.error = data.Error || "Фильмы не найдены";
            }
        } catch (error) {
            this.error = "Ошибка при загрузке данных";
        } finally {
            this.isLoading = false;
        }
    }

    async fetchMovieDetails(imdbID: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?i=${imdbID}&apikey=bdf20dcb`
            );
            const data = await response.json();

            if (data.Response === "True") {
                this.selectedMovie = data;
            } else {
                this.error = data.Error || "Фильм не найден";
            }
        } catch (error) {
            this.error = "Ошибка при загрузке данных";
        } finally {
            this.isLoading = false;
        }
    }
}

export const movieStore = new MovieStore();