import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}


interface MovieResponseProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}


interface GenreProviderProps {
    children: ReactNode
}

interface GenreContextData {
    selectedGenreId: number,
    selectedGenre: GenreResponseProps,
    updateSelectedGenre: (genreId: number) => Promise<void>;
    genres: GenreResponseProps[],
    movies: MovieResponseProps[],
}

const GenreContext = createContext<GenreContextData>(
    {} as GenreContextData
);

export function GenreProvider({ children }: GenreProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({id: 1, name: 'action', title: 'Ação'});
    const [movies, setMovies] = useState<MovieResponseProps[]>([]);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    useEffect(() => {
        api.get<MovieResponseProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        });
    }, [selectedGenreId]);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    async function updateSelectedGenre(genreId: number) {
        setSelectedGenreId(genreId);
    }

    return (
        <GenreContext.Provider value={{ selectedGenreId, selectedGenre, updateSelectedGenre, genres, movies }}>
            {children}
        </GenreContext.Provider>
    );
}

export function useGenre() {
    const context = useContext(GenreContext);
    return context;
}