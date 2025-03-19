import { useState } from "react";
import MovieDescription from "../moviedescription/MovieDescription";
import styles from "./MovieCard.module.css";

const MovieCard = ({ title, poster, type, year, apiUrl, movieID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{year}</p>
        </div>

        <div>
          <img src={poster} alt={`Poster de ${title}`} />
        </div>

        <div>
          <span>{type}</span>
          <h3>{title}</h3>
        </div>
      </div>
      {isModalOpen && (
        <MovieDescription
          apiUrl={apiUrl} // Passa a URL base da API
          movieID={movieID} // Passa o ID do filme para buscar os detalhes
          click={toggleModal} // Fecha o modal ao clicar fora
        />
      )}
    </>
  );
};

export default MovieCard;