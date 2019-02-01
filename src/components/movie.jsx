import React, { Component } from "react";
import MovieRating from "./movieRating";
// import { Lightbox, LightboxModal, LightboxTrigger } from "./react-lightbox";
// import MovieDetail from "./movieDetail";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // { movie };
    this.buttonDOM = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDetailRequest = this.handleDetailRequest.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("Movie - ComponentDidUpdate");
    // add movieCertification to the movie:
    prevProps.movie.certification =
      (!!prevProps.movieCertification &&
        prevProps.movieCertification.length > 0 &&
        prevProps.movieCertification[0].certification) ||
      "--";
    // this.setState({ movie: prevProps.movie });
  }

  // componentWillUnmount() {
  //   console.log(
  //     "Movie - ComponentWillUnmount: Cleanup listeners or timers to prevent memory leaks"
  //   );
  // }

  getYear = releaseDate => {
    const d = new Date(releaseDate);
    return d.getFullYear();
  };

  handleDetailRequest = (onDetailRequest, movie) => {
    onDetailRequest(movie);
  };

  handleButtonClick = onLoadMoreRequest => {
    // Pass a function to the onLoadMoreRequest that acts as a dependency inversion to clear the status of this DOM's focus to blur.
    onLoadMoreRequest(this.blurButtonDelegate);
  };

  blurButtonDelegate = () => {
    !!this.buttonDOM && this.buttonDOM.blur();
  };

  splitStringLines = (str, splitpoint) => {
    if (str.length < splitpoint) {
      return str;
    }

    let e = 0;
    let d = 0;
    let result = "";

    while (e < str.length) {
      d = str.substr(e, splitpoint).lastIndexOf(" ");
      if (d <= 0 || e >= str.length - splitpoint) {
        result = result + str.substr(e);
        e = str.length;
      } else {
        result = result + str.substr(e, d) + "<br/>";
        e = e + d + 1;
      }
    }
    return result;
  };

  render() {
    const {
      movie,
      movieCertification,
      /* after writing the MovieDb user account links, we can have the user click on what to watch, and rate movies */
      /**   onWantToWatchToggle,
      onRated,
      onClearRating, **/
      onDetailRequest,
      onLoadMoreRequest
    } = this.props;

    movie.certification =
      (!!movieCertification &&
        movieCertification.length > 0 &&
        movieCertification[0].certification) ||
      "--";

    return (
      <React.Fragment>
        {!!!movie.poster_path && !!!movie.id ? (
          <button
            className="invisibleButton"
            onClick={() => {
              this.handleButtonClick(onLoadMoreRequest);
            }}
            ref={buttonDOM => {
              this.buttonDOM = buttonDOM;
            }}
          >
            <div className="noMoviePoster">
              <div className="icon" />
              <div className="movieTitleAndDate">
                <div className="movieTitle">{movie.title}</div>
                <div className="movieDate" />
              </div>
            </div>
          </button>
        ) : (
          <div className="moviePoster">
            {/* <Lightbox>
            <LightboxTrigger>
              <i className="fa fa-info btn" data-tip="Click For Details" />
            </LightboxTrigger>
            <LightboxModal>This is a test</LightboxModal>
          </Lightbox> */}
            <i
              className="fa fa-info btn"
              data-for="global_rtt"
              data-tip={
                movie.release_date +
                "<br/>" +
                this.splitStringLines(movie.overview, 40)
              }
            />
            <MovieRating
              imdbRating={movie.vote_average}
              userRating={movie.userRating}
              voteCount={movie.vote_count}
            />
            <i
              className="fa fa-heart btn"
              data-for="global_rtt"
              data-tip={
                /* (movie.userFavorited ? "A Favorite" : "Not a Favorite") + ". " + */
                "Popularity at " + movie.popularity
              }
            />
            {/*<i
              className="fa fa-bookmark btn"
              data-tip={
                movie.userWantsToWatch
                  ? "In Watch List"
                  : "Click to add to Watch List"
              }
            />*/}
            {movie.certification}
            {!!!movie.poster_path ? (
              <div
                className="icon"
                onClick={() => {
                  console.log("Movie Detail Clicked: " + movie.id);
                  this.handleDetailRequest(onDetailRequest, movie);
                }}
              />
            ) : (
              <img
                src={
                  "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +
                  movie.poster_path
                }
                alt={movie.title}
                onClick={() => {
                  this.handleDetailRequest(onDetailRequest, movie);
                }}
              />
            )}
            <div className="movieTitleAndDate">
              <div className="movieTitle">{movie.title}</div>
              <div className="movieDate">
                ({this.getYear(movie.release_date)})
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Movie;
