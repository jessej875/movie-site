import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/movies/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

app.get('/api/movies/top-rated', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch top rated movies' });
  }
});

app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

app.get('/api/movies/now-playing', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch now playing movies' });
  }
});

app.get('/api/movies/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
