import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react"; // Importa useState e useEffect
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/moviecard/MovieCard";
import Logo from "./assets/devflix.png";
import Lupa from "./assets/search.svg";
import linkedin from "./assets/logo-linkedin-2.svg"; // Importa o ícone do LinkedIn
import axios from "axios";
import MoonIcon from "./assets/moon-outline.svg"; // Ícone de lua
import SunIcon from "./assets/sunny-outline.svg"; // Ícone de sol
import Switch from "./components/switch/Switch"; // Importa o switch atualizado
import Instagram from "./assets/logo-instagram-1.svg"; // Importa o ícone do Instagram
import HamburgerMenu from "./components/hamburgermenu/HamburgerMenu"; // Importa o componente do menu hamburger

const App = () => {
  const [search, setSearch] = useState(""); // Estado para o termo de busca
  const [movies, setMovies] = useState([]); // Estado para os filmes encontrados
  const [isSearchDone, setIsSearchDone] = useState(false); // Estado para controlar se a pesquisa foi feita
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para o filme selecionado
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  ); // Estado para o tema atual

  const apiKey = "9506a07caf1cb498a79d6bd505c6b62e";
  const apiUrl = `https://api.themoviedb.org/3`;

  const mudaTema = () => {
    const tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-bs-theme", tema);
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTA2YTA3Y2FmMWNiNDk4YTc5ZDZiZDUwNWM2YjYyZSIsIm5iZiI6MTc0MjMzNDM0NS43ODgsInN1YiI6IjY3ZDllOTg5MTk3NGRmYmVhZjJjZDI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Brd9R7MqbhSEzcTwKx1zmecJqrKeFuxE_Y8UlCSYRdE'
    }
  };
  
  fetch('https://api.themoviedb.org/3/tv/changes?page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

  mudaTema(); // Chama a função ao carregar o site

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", mudaTema); // Atualiza o tema ao mudar

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Define o filme selecionado
  };

  const closeMovieDescription = () => {
    setSelectedMovie(null); // Fecha o quadro de descrição
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/movie/popular`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          page: 1, // Busca a primeira página de filmes populares
        },
      });
      setMovies(response.data.results.slice(0, 10)); // Exibe apenas os 10 primeiros filmes
    } catch (error) {
      console.error("Erro ao buscar filmes populares:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []); // Executa apenas uma vez ao montar o componente

  const searchMovies = async (query) => {
    if (!query) return; // Não faz nada se a pesquisa estiver vazia
    try {
      setMovies([]); // Zera os MovieCards antes de realizar a nova busca
      const response = await axios.get(`${apiUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          query: query,
        },
      });
      setMovies(response.data.results || []); // Atualiza os filmes encontrados
      setIsSearchDone(true); // Marca que a pesquisa foi feita
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div id="app">
      {/* Menu hamburger no canto superior esquerdo */}
      <div className="hamburger-menu">
        <HamburgerMenu />
      </div>

      {/* Switch para alternar o tema no canto superior direito */}
      <div className="theme-switch">
        <Switch
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedIcon={<img src={MoonIcon} alt="Dark Mode" />}
          uncheckedIcon={<img src={SunIcon} alt="Light Mode" />}
          offColor="#f5f5f5"
          onColor="#222"
        />
      </div>

      {/* Exibe a logo acima da barra de pesquisa */}
      <div className={`logo ${isSearchDone ? "small" : "large"}`}>
        <img src={Logo} alt="DevFlix Logo" />
      </div>

      {/* Barra de pesquisa */}
      <div className="search">
        <input
          type="text"
          placeholder="Pesquise por filmes"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado da pesquisa
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)} // Detecta a tecla Enter
        />
        <button onClick={() => searchMovies(search)}>
          <img src={Lupa} alt="Buscar" /> {/* Ícone da lupa */}
        </button>
      </div>

      {/* Lista de filmes */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              poster={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              type={movie.media_type || "Filme"}
              year={movie.release_date?.split("-")[0] || "Ano desconhecido"}
              apiUrl={apiUrl}
              movieID={movie.id}
              onClick={() => handleMovieClick(movie)} // Define o clique no filme
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      {/* Quadro de descrição do filme */}
      {selectedMovie && (
        <>
          <div
            className="movie-description-backdrop"
            onClick={closeMovieDescription}
          ></div>
          <div className="movie-description">
            <button
              className="movie-description-close"
              onClick={closeMovieDescription}
            >
              &times; {/* Ícone do botão "X" */}
            </button>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview || "Descrição não disponível."}</p>
            <p>
              <strong>Data de lançamento:</strong>{" "}
              {selectedMovie.release_date || "Desconhecida"}
            </p>
            <p>
              <strong>Nota:</strong> {selectedMovie.vote_average || "N/A"}
            </p>
          </div>
        </>
      )}

      {/* Rodapé com o ícone do LinkedIn */}
      <Footer devName={" Limazxzn"} devLink={"https://github.com/Limazxz"}>
        <a href="https://www.linkedin.com/in/pedro-silva-de-lima-083562313/">
          <img src={linkedin} alt="LinkedIn" /> {/* Ícone do LinkedIn */}
        </a>
        <a href="https://www.instagram.com/limazxzn/">
          <img src={Instagram} alt="Instagram" /> {/* Ícone do Instagram */}
        </a>
      </Footer>
    </div>
  );
};

export default App;
