import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { fetchRandomMovieTvDetails } from "../apiService/apiService";
import { trending } from "../types/Tmdb";
import Loading from "../components/Loading";
import { Route, Routes } from "react-router-dom";
import Movie from "../components/Movie";
import Tv from "../components/Tv";
import Celebrities from "../components/Celebrities";

const Home = () => {
  const [randomTrend, setRandomTrend] = useState<trending | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomTrend = async () => {
    const random = await fetchRandomMovieTvDetails();
    setRandomTrend(random);
  };

  useEffect(() => {
    fetchRandomTrend();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading === true ? (
    <Loading />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Hero trending={randomTrend} />} />
        <Route path="series" element={<Tv />} />
        Movie
        <Route path="filmes" element={<Movie />} />
        <Route path="celebridades" element={<Celebrities />} />
      </Routes>
    </>
  );
};

export default Home;
