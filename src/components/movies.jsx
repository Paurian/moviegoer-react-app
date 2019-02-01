import React from "react";
import Movie from "./movie";

const Movies = ({
  movies,
  movieCertifications,
  onWantToWatchToggle,
  onRated,
  onClearRating,
  onDetailRequest,
  onLoadMoreRequest
}) => {
  return (
    <div className="d-flex align-content-start flex-wrap movies-block justify-content-between">
      {movies &&
        movies.length > 0 &&
        movies.map(movie => (
          <Movie
            key={movie.id}
            movie={movie}
            movieCertification={movieCertifications.filter(
              c => c.id === movie.id
            )}
            onWantToWatchToggle={onWantToWatchToggle}
            onRated={onRated}
            onClearRating={onClearRating}
            onDetailRequest={onDetailRequest}
            onLoadMoreRequest={onLoadMoreRequest}
          />
        ))}
    </div>
  );
};

export default Movies;
