import React, { Component } from "react";
import "./App.css";
import MovieNavbar from "./components/movieNavbar";
import Movies from "./components/movies";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import MovieDetail from "./components/movieDetail";

/** Using the ReactJS Container and Presentational Design Pattern as recommended by Dan Abromov:
 * https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 */
class App extends Component {
  queryOptions = [
    { query: "now_playing", title: "Now Playing", sortBy: "release_date.desc" },
    { query: "popular", title: "Popular", sortBy: "popularity.desc" },
    { query: "top_rated", title: "Top Rated", sortBy: "vote_average.desc" },
    { query: "upcoming", title: "Upcoming", sortBy: "release_date.asc" }
  ];

  moviesToOmit = [570861];

  filledPeriodMax = 6;
  periodDays = 14;

  freshState = {
    movies: [],
    movieCertifications: [],
    highestPageLoaded: 0,
    searchString: "",
    highestPageAvailable: 100,
    filledPeriods: 0,
    selectedMovie: {},
    showMovieDetail: false
  };

  loadMoreMoviesCard = {
    vote_count: 0,
    id: 0,
    video: false,
    vote_average: 0,
    title: "Load More Movies",
    popularity: 0,
    poster_path: "",
    original_language: "en",
    original_title: "Load More Movies",
    genre_ids: [0],
    backdrop_path: "",
    adult: false,
    overview: "Click here to load more movies from TMDb",
    release_date: "1800-01-01"
  };

  constructor(props) {
    super(props);
    // App - Constructor - A good oportunity to initialize data, such as setting this.state to this.props.something
    // This is the only place we can set the state directly instead of through setState
    this.state = Object.assign({}, this.freshState);
    this.state.currentQueryOption = Object.assign({}, this.queryOptions[0]);
  }

  resetMovies = (newQueryOption, newSearchString, onResetDelegate) => {
    if (
      newQueryOption.query !== this.state.currentQueryOption.query ||
      (newSearchString != null && newSearchString !== this.state.searchString)
    ) {
      let newState = Object.assign({}, this.freshState);
      newState.currentQueryOption = newQueryOption;
      newState.searchString = newSearchString;

      this.setState(newState, s => {
        if (!!onResetDelegate) {
          onResetDelegate(newQueryOption);
        }
      });
      return true;
    }
    return false;
  };

  requestMoviesBySearch = (search, sortBy, delegate) => {
    this.resetMovies(this.state.currentQueryOption, search, null);

    const page =
      search !== this.state.searchString ? 1 : this.state.highestPageLoaded + 1;

    // return if there are no More Pages To Load For The Current Search Criteria
    if (page > this.state.highestPageAvailable) return;

    // search !== this.state.searchString ? 1 : this.state.highestPageLoaded + 1;
    // https://www.themoviedb.org/talk/5339fe0ac3a3680e7f006a90
    // Searches are forced to return based on the lucene score in Elistisearch. This means the title that the user
    // wants could be on the last page. Can I chain to bring down 5 pages at a time (100 records)?
    let fullQuery =
      "https://api.themoviedb.org/3/search/movie?api_key=c9b9a4f750c6d8f703a35d280a9911a3&language=en-US&query=" +
      encodeURI(search) +
      "&page=" +
      page +
      "&include_adult=false";

    console.log("Requesting: " + fullQuery);

    if (search !== this.state.searchString) {
      let newState = Object.assign({}, this.freshState);
      newState.searchString = search;
      newState.filledPeriods = this.filledPeriodMax;

      // set the state then getMovies because getMovies expects the state to be fresh.
      this.setState(newState, () => {
        console.log(
          "set State to new value: " +
            search +
            " curent value is " +
            this.state.searchString
        );
        this.getMovies(fullQuery, sortBy, delegate);
      });
    } else {
      this.getMovies(fullQuery, sortBy, delegate);
    }
  };

  addMovieCertificationToState = (movieID, cert) => {
    // Check again to see if we need to add this, in case multiple calls went out.
    // Perform a functional setState to reduce asynchronous issues.
    // https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
    if (!this.state.movieCertifications.some(mc => mc.id === movieID)) {
      this.setState(prevState => ({
        movieCertifications: prevState.movieCertifications.concat([
          { id: movieID, certification: cert }
        ])
      }));
    }
  };

  // NA means the movie wasn't found from the response.
  // NR means it was found, but had no rating.
  // -- means the request for that movie's release dates resulted in an error.
  getMovieCertification = movieID => {
    console.log("Getting certification for " + movieID);
    // https://api.themoviedb.org/3/movie/85/release_dates?api_key=c9b9a4f750c6d8f703a35d280a9911a3
    // not really thread safe, but trying to reduce the calls if the movies list clears before
    // the request to get the certification is made. If the id exists in our movies AND doesn't
    // exist in our certifications, make an asynchronous call to grab it.
    if (!this.state.movies.some(m => m.id === movieID)) {
      return;
    }
    if (this.state.movieCertifications.some(c => c.id === movieID)) {
      return;
    }

    const query =
      "https://api.themoviedb.org/3/movie/" +
      movieID +
      "/release_dates?api_key=c9b9a4f750c6d8f703a35d280a9911a3";
    axios
      .get(query)
      .then(resp => {
        const certUS = resp.data.results.filter(r => r.iso_3166_1 === "US");
        let cert = "NA";
        if (certUS.length > 0 && certUS[0].release_dates.length > 0) {
          let certRD = certUS[0].release_dates.filter(rd => rd.type === 3);
          // If we don't have a theatrical release, get the limited release.
          // These apply to special showings such as Sundance.
          if (movieID === 100445) {
          }
          if (certRD.length === 0) {
            certRD = certUS[0].release_dates.filter(rd => rd.type === 2);
          }
          if (certRD.length > 0) {
            cert = certRD[0].certification;
            if (!cert) {
              cert = "NR";
            }
          }
        }
        this.addMovieCertificationToState(movieID, cert);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 429) {
            // If we were denied because there were too many requests at once, delay a couple of seconds and try again.
            console.log(
              "Attempting to retry certification for " +
                movieID +
                " in 2 seconds..."
            );
            setTimeout(this.getMovieCertification, 2000, movieID);
          }
        }
      });
  };

  requestMoviesByQuery = (query, sortBy, delegate) => {
    if (!!this.state.searchString) {
      this.setState({ searchString: "" });
      sortBy = this.queryOptions.filter(f => {
        return f.query === query;
      }).sortBy;
    }

    let newQueryOption = { query: query, sortBy: sortBy, title: "Custom" };
    let highestPageLoaded = this.state.highestPageLoaded;
    let highestPageAvailable = this.state.highestPageAvailable;
    let filledPeriods = this.state.filledPeriods;
    if (this.resetMovies(newQueryOption, null, null)) {
      highestPageLoaded = 0;
      highestPageAvailable = 100;
      filledPeriods = 0;
      this.setState({ filledPeriods });
    }

    console.log(
      "requestMoviesByQuery: highestPageLoaded = " +
        highestPageLoaded +
        " highestPageAvailable = " +
        highestPageAvailable +
        " filledPeriods = " +
        filledPeriods
    );

    let thisPage = highestPageLoaded + 1;
    if (thisPage > highestPageAvailable) {
      if (filledPeriods < this.filledPeriodMax) {
        thisPage = 1;
        highestPageLoaded = 0;
        highestPageAvailable = 100;
        filledPeriods = filledPeriods + 1;
        this.setState({ filledPeriods });
      } else {
        console.log("No More Pages To Load For The Current Search Criteria");
        return;
      }
    }

    const fullQuery =
      "https://api.themoviedb.org/3/discover/movie?" +
      "api_key=c9b9a4f750c6d8f703a35d280a9911a3" +
      "&language=en-US&region=US&certification.lte=R&include_adult=false" +
      "&include_video=false&with_original_language=en&with_release_type=3" +
      "&sort_by=" +
      sortBy +
      "&page=" +
      thisPage;

    // The idea here is to grow outward as much as possible.
    // it might be better to use delta instead of extendedPages in the state
    // if we want more than two tiers.
    const pd = this.periodDays;
    const today = new Date();
    const p1Str = today.addDays(filledPeriods * pd * -1).yyyymmdd();
    const p2Str = today.addDays(filledPeriods * pd * -1 - pd).yyyymmdd();
    const n1Str = today.addDays(filledPeriods * pd).yyyymmdd();
    const n2Str = today.addDays(filledPeriods * pd + pd).yyyymmdd();
    const pStr = today.addDays(this.filledPeriodMax * pd * -1).yyyymmdd();
    const nStr = today.addDays(this.filledPeriodMax * pd).yyyymmdd();

    // Upcoming
    let partQuery = "&release_date.gte=" + n1Str + "&release_date.lte=" + n2Str;
    switch (query) {
      case "now_playing":
        partQuery = "&release_date.gte=" + p2Str + "&release_date.lte=" + p1Str;
        break;
      case "upcoming":
        partQuery = "&release_date.gte=" + n1Str + "&release_date.lte=" + n2Str;
        break;
      case "popular":
        partQuery = "&release_date.gte=" + pStr + "&release_date.lte=" + nStr;
        break;
      case "top_rated":
        partQuery = "&release_date.gte=" + pStr + "&release_date.lte=" + nStr;
        break;
      default:
    }

    console.log("Requesting: " + fullQuery + partQuery);

    this.getMovies(fullQuery + partQuery, sortBy, delegate);
  };

  sortCurrentMovies = sortBy => {
    console.log("sortCurrentMovies on " + sortBy);
    const currentMovies = [].concat(this.state.movies);
    let currentQueryOption = Object.apply({}, this.state.currentQueryOption);
    currentQueryOption.sortBy = sortBy;
    // Because it's possible that we don't have a "Load More Movies" card.
    this.sortMovies(sortBy, currentMovies);
    this.setState({
      movies: currentMovies,
      currentQueryOption: currentQueryOption
    });
  };

  sortMovies = (sortBy, movies) => {
    if (!!sortBy && movies.length > 1) {
      console.log("sort " + movies.length + " Movies by " + sortBy);
      const sort = sortBy.split(".");
      const sortKey = sort[0];
      const sortDir = sort[1];
      const moreCard = movies[movies.length - 1].id === 0 ? movies.pop() : null;

      if (sortKey === "vote_average") {
      }

      // if we sort by votes, weight the order by the vote_average. Movies with less than 10 votes aren't as significant.
      movies.sort(function(a, b) {
        let result = 0;
        if (sortKey === "title") {
          result = a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
        } else if (sortKey === "vote_average") {
          let av = a.vote_count < 10 ? 0 : 1;
          let bv = b.vote_count < 10 ? 0 : 1;
          result =
            av > bv
              ? 1
              : av < bv
              ? -1
              : a.vote_average > b.vote_average
              ? 1
              : a.vote_average < b.vote_average
              ? -1
              : 0;
          if (result !== 0) {
            result = (sortDir === "desc" ? -1 : 1) * result;
          } else {
            result = a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
          }
          return result;
        } else {
          // use title as a secondary sort key
          result =
            !!sortKey && a[sortKey] !== b[sortKey]
              ? a[sortKey] > b[sortKey]
                ? 1
                : -1
              : a.title > b.title
              ? 1
              : a.title < b.title
              ? -1
              : 0;
        }
        return (sortDir === "desc" ? -1 : 1) * result;
      });
      if (!!moreCard) {
        movies.push(moreCard);
      }

      // console.log(
      //   "sortMovies: sorted as: " +
      //     movies.map(m => {
      //       return m[sortKey];
      //     })
      // );
    }
  };

  getMovies = (fullQuery, sortBy, delegate) => {
    console.log("getMovies on fullQuery: " + fullQuery);
    axios
      .get(fullQuery)
      .then(resp => {
        console.log("Got Response:");
        // console.log(resp);
        let highestPageLoaded = resp.data.page;
        let highestPageAvailable = resp.data.total_pages;

        let movies = [].concat(this.state.movies);
        // Filter out new movies that:
        // 1. are adult, 2. are not english,
        // 3. are in the omition index,
        // 4. are already in the state's movie list.
        const newMovies = resp.data.results.filter(
          m =>
            !!m.adult === false &&
            m.original_language === "en" &&
            this.moviesToOmit.indexOf(m.id) < 0 &&
            !movies.some(sm => sm.id === m.id)
        );

        let extendedPages = this.state.extendedPages;

        // pop off the more card if it exists.
        if (movies.length > 1 && movies[movies.length - 1].id === 0) {
          movies.pop();
        }

        movies = Array.from(new Set(movies.concat(newMovies)));

        // Will need to make the following call for each movie if I want to limit the certification rating (e.g. filter out rated "R" material)
        // GET /movie/{movie_id}/release_dates ... see https://developers.themoviedb.org/3/movies/get-movie-release-dates and filter on type "2" and "3"

        console.log("Sorting movies by: '" + sortBy + "'");
        this.sortMovies(sortBy, movies);

        console.log(
          "getMovies: highestPageLoaded: " +
            highestPageLoaded +
            ", highestPageAvailable: " +
            highestPageAvailable
        );

        if (
          highestPageLoaded < highestPageAvailable ||
          this.state.filledPeriods < this.filledPeriodMax
        ) {
          movies.push(this.loadMoreMoviesCard);
        }

        console.log(
          "After Sort: " +
            movies.map(m => {
              return m.release_date;
            })
        );

        this.setState({
          movies,
          highestPageLoaded,
          highestPageAvailable
        });

        // Get the certificaiton (G, PG, PG-13, etc) for each movie we just got.
        newMovies.forEach(nm => this.getMovieCertification(nm.id));
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 429) {
            // If we were denied because there were too many requests at once, delay a couple of seconds and try again.
            console.log(
              "Attempting to retry getMovies for " +
                fullQuery +
                " in 2 seconds..."
            );
            setTimeout(this.getMovies, 2000, fullQuery, sortBy, delegate);
          }
        }
      })
      .then(() => {
        if (!!delegate) {
          delegate();
        }
        ReactTooltip.rebuild();
      });
  };

  // Since React version 16 we can cancel setState requests by returning undefined or null

  componentDidMount() {
    // App - ComponentDidMount - Called after component is rendered into the DOM. Perfect time to call AJAX and use setState to assign new data.
    this.requestMoviesByQuery(
      this.state.currentQueryOption.query,
      this.state.currentQueryOption.sortBy,
      null
    );
  }

  handleWantToWatchToggle = () => {
    console.log("handleWantToWatchToggle");
  };

  handleRated = () => {
    console.log("handleRated");
  };

  handleClearRating = () => {
    console.log("handleClearRating");
  };

  handleDetailRequest = selectedMovie => {
    console.log("handleDetailRequest");
    this.setState({ selectedMovie });
  };

  /* This delegate is an example of Dependency Injection */
  handleLoadMoreRequest = delegate => {
    if (!!this.state.searchString) {
      this.requestMoviesBySearch(
        this.state.searchString,
        this.state.currentQueryOption.sortBy,
        delegate
      );
    } else {
      this.requestMoviesByQuery(
        this.state.currentQueryOption.query,
        this.state.currentQueryOption.sortBy,
        delegate
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <MovieNavbar
          currentQueryOption={this.state.currentQueryOption}
          queryOptions={this.queryOptions}
          onQueryOptionSelected={this.requestMoviesByQuery}
          onSearchClicked={this.requestMoviesBySearch}
          onSortOptionSelected={this.sortCurrentMovies}
        />
        <main className="container main-area" id="appContent">
          <Movies
            movies={this.state.movies}
            movieCertifications={this.state.movieCertifications}
            onWantToWatchToggle={this.handleWantToWatchToggle}
            onRated={this.handleRated}
            onClearRating={this.handleClearRating}
            onDetailRequest={this.handleDetailRequest}
            onLoadMoreRequest={this.handleLoadMoreRequest}
          />
          <ReactTooltip
            id="global_rtt"
            place="bottom"
            type="light"
            effect="solid"
            border={true}
            className="leftAlignedReactTooltip"
            multiline={true}
          />
        </main>
        <MovieDetail
          movie={this.state.selectedMovie}
          modalIsOpen={!!this.state.selectedMovie.id}
        />
        {/* Need to add component to pop-up movie detail on top of entire list */}
      </React.Fragment>
    );
  }
}

export default App;
