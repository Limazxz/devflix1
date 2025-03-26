import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = ({ apiUrl, movieID, click }) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [showWatchButton, setShowWatchButton] = useState(false); // Estado para exibir o botão

  useEffect(() => {
    fetch(`${apiUrl}/movie/${movieID}?api_key=9506a07caf1cb498a79d6bd505c6b62e&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => setMovieDesc(data))
      .catch((error) => console.error(error));
  }, [apiUrl, movieID]);

  const posterUrl = movieDesc.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDesc.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"; // Fallback para quando não houver poster

  return (
    <div className={styles.modalBackdrop} onClick={click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.btnClose} onClick={click}>
          X
        </button>
        <div
          className={styles.movieInfo}
          onMouseEnter={() => setShowWatchButton(true)} // Exibe o botão ao passar o mouse
          onMouseLeave={() => setShowWatchButton(false)} // Oculta o botão ao sair do mouse
        >
          <div className={styles.posterWrapper}>
            <img
              src={posterUrl}
              alt={`Poster do filme ${movieDesc.title || "Desconhecido"}`}
              className={styles.poster}
            />
            {showWatchButton && (
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.watchButton}
              >
                ▶️ Assistir
              </a>
            )}
          </div>
          <h2>{movieDesc.title || "Título não disponível"}</h2>
          <p>{movieDesc.overview || "Descrição não disponível"}</p>
          <p>
            <strong>Data de lançamento:</strong> {movieDesc.release_date || "Data não disponível"}
          </p>
          <p>
            <strong>Nota:</strong> {movieDesc.vote_average || "Nota não disponível"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;