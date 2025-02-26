import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                search: "Search",
                searchMovies: "Search Movies",
                year: "Year",
                type: "Type",
                any: "Any",
                movie: "Movie",
                series: "Series",
                episode: "Episode",
            },
        },
        ru: {
            translation: {
                search: "Поиск",
                searchMovies: "Поиск фильмов",
                year: "Год",
                type: "Тип",
                any: "Любой",
                movie: "Фильм",
                series: "Сериал",
                episode: "Эпизод",
            },
        },
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;