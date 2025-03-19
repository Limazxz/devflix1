import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/moviecard/MovieCard";
import Logo from "./assets/devflix.png";
import Lupa from "./assets/search.svg";
import Menu from "./assets/menu-outline.svg";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar a visibilidade do menu

  const apiKey = "9506a07caf1cb498a79d6bd505c6b62e";
  const apiUrl = `https://api.themoviedb.org/3`;
  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  async function searchMovies() {
    const response = await axios.get(`${apiUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: "pt-BR",
        page: 1,
      },
    });
    //const data = await response.json();
    var data = response.data.results;
    console.log(data);
    //return data;
    setMovies(data); // Exibe os filmes populares
  }

  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  return (
    <div id="app">
      <img className="logo" src={Logo} alt="" />

      <div className="search">
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por filmes"
        />
        <img onClick={() => searchMovies(search)} src={Lupa} alt="" />
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
      <div className="register-button">
        <button onClick={() => alert("Cadastro Concluído!")}>Cadastro</button>
      </div>

      <div className="login-button">
        <button onClick={() => alert("Login Concluído!")}>Login</button>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} apiUrl={apiUrl} {...movie} />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Footer devName={" Limazxzn"} devLink={"https://github.com/Limazxz"} />
    </div>
  );
};

export default App;
