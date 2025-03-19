import axios from "axios";

const API_KEY = "9506a07caf1cb498a79d6bd505c6b62e"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
