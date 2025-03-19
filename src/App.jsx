import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react"; // Importa useState e useEffect
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/moviecard/MovieCard";
import Logo from "./assets/devflix.png";
import Lupa from "./assets/search.svg";
import Menu from "./assets/menu-outline.svg";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState(""); // Estado para o termo de busca
  const [movies, setMovies] = useState([]); // Estado para os filmes encontrados
  const [menuVisible, setMenuVisible] = useState(false); // Estado para visibilidade do menu

  const apiKey = "9506a07caf1cb498a79d6bd505c6b62e";
  const apiUrl = `https://api.themoviedb.org/3`;

  // Função para buscar filmes com base no termo de busca
  const searchMovies = async (query) => {
    if (!query) return; // Não faz nada se a pesquisa estiver vazia
    try {
      const response = await axios.get(`${apiUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          query: query,
        },
      });
      setMovies(response.data.results || []); // Atualiza os filmes encontrados
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  // Função para buscar filmes populares ao carregar o componente
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/movie/popular`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
        },
      });
      setMovies(response.data.results || []); // Atualiza os filmes populares
    } catch (error) {
      console.error("Erro ao buscar filmes populares:", error);
    }
  };

  // useEffect para carregar filmes populares ao montar o componente
  useEffect(() => {
    fetchPopularMovies();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(search); // Chama a função de busca ao pressionar Enter
    }
  };

  return (
    <div id="app">
      {/* Exibe a logo acima da barra de pesquisa */}
      <div className="logo">
        <img src={Logo} alt="DevFlix Logo" />
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Pesquise por filmes"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado da pesquisa
          onKeyDown={handleKeyPress} // Detecta a tecla Enter
        />
        <button onClick={() => searchMovies(search)}>
          <img src={Lupa} alt="Buscar" /> {/* Ícone da lupa */}
        </button>
      </div>

      <div className="menu" onClick={() => setMenuVisible(!menuVisible)}>
        <img src={Menu} alt="Menu" />
      </div>

      {menuVisible && ( // Renderiza os itens do menu apenas se menuVisible for true
        <div
          className="menu-backdrop"
          onClick={() => setMenuVisible(false)} // Fecha o menu ao clicar fora
        >
          <div
            className="menu-items"
            onClick={(e) => e.stopPropagation()} // Impede o clique dentro do menu de fechar o menu
          >
            <ul>
              <li>Canais</li>
              <li>Canais Pagos</li>
              <li>Animes</li>
              <li>Séries</li>
              <li>Gêneros</li>
            </ul>
          </div>
        </div>
      )}

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
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Footer devName={"Limazxzn"} devLink={"https://github.com/Limazxz"} />
    </div>
  );
};

export default App;