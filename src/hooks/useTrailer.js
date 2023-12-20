import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { addTrailer } from '../utils/store/movieSlice';
import { API_OPTIONS } from '../utils/constants';

const useTrailer = (movieId) => {
  const dispatch = useDispatch();

  const fetchMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    const trailers = json.results.filter((video) => video.type === 'Trailer');
    const trailer = trailers.length ? trailers[0] : json.results[0];

    dispatch(addTrailer(trailer));
  };

  useEffect(() => {
    fetchMovieVideos();
  }, []);
};

export default useTrailer;
