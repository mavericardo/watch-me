import { useGenre } from "../hooks/useGenre";
import { Button } from "./Button";

export function SideBar() {
  const { genres, selectedGenreId, updateSelectedGenre } = useGenre();

  async function handleClickButton(genreId: number) {
    await updateSelectedGenre(genreId);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}