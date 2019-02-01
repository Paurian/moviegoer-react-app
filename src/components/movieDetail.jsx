import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%"
  }
};

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    console.log("MovieDetail Constructor Called");

    this.state = {
      movie: {},
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modalIsOpen !== nextState.modalIsOpen) {
      console.log(
        "movieDetail shouldComponentUpdate is true. modalIsOpen changed"
      );
      return true;
    }

    // This poses a problem when someone clicks on the same movie after closing the detail modal
    if (this.props.movie.id === nextProps.movie.id) {
      console.log(
        "MovieDetail shouldComponentUpdate is false. " +
          this.props.movie.id +
          " to " +
          nextProps.movie.id
      );
      return false;
    }

    if (!!nextProps.movie.id) {
      this.openModal();
    } else {
      this.closeModal();
    }
    return true;
  }

  getMovieDetail = id => {
    if (!!this.state.modalIsOpen) {
      console.log("getMovieDetail for " + id);
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/movie/${id}?api_key=c9b9a4f750c6d8f703a35d280a9911a3&language=en-US`
      //   )
      //   .then(resp => {
      //     const movieDetail = resp.data.results;
      //     this.setState({ movieDetail });
      //   });
    }
  };

  componentDidMount() {
    console.log("!! movieDetail Did Mount");
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    // var ac = document.getElementById("appContent");
    // console.log(ac);
    // Modal.setAppElement(ac);
    // this.closeModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!!this.props.movie &&
        !!prevProps.movie &&
        this.props.movie.id != prevProps.movie.id) ||
      !!this.props.movie !== !prevProps.movie
    ) {
      console.log(
        "componentDidUpdate set the state " + !!this.props.movie
          ? this.props.movie.id
          : 0
      );
      this.setState({
        movieDetail: this.props.movie,
        movieRating: !!this.props.movie ? this.props.movie.certification : null
      });
    }
  }

  openModal() {
    // Modal.setAppElement("#App");
    // console.log(
    //   "this.state.appElement = " +
    //     this.state.appElement +
    //     ", " +
    //     this.apElement +
    //     ", " +
    //     Modal.appElement
    // );
    console.log("openModal Called");
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.getMovieDetail(this.props.movie.id);
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    console.log("closeModal Called");
    this.setState({ modalIsOpen: false });
  }

  logMovieDetail(movie) {
    let objectBreakdown = "";
    for (var name in movie) {
      if (movie.hasOwnProperty(name)) {
        objectBreakdown =
          objectBreakdown +
          (!objectBreakdown ? "" : ", ") +
          name +
          ": " +
          movie[name];
      }
    }

    console.log(
      "!! movieDetail rendered: " +
        movie.title +
        " (" +
        movie.certification +
        ") " +
        " = " +
        this.state.modalIsOpen +
        ", " +
        movie +
        ", " +
        " [" +
        objectBreakdown +
        "] = " +
        (!!this.state.modalIsOpen && !!movie && !!movie.id)
    );
  }

  render() {
    const { movie } = this.props;

    console.log(
      "movieDetail render called: " +
        "props.movie.id=" +
        (!!movie ? movie.id : "null") +
        " and modalIsOpen = " +
        this.state.modalIsOpen
    );
    this.logMovieDetail(movie);
    // this.setState({ modalIsOpen: modalIsOpen }); // Dangerous!
    // logMovieDetail(movie);

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel={movie.title}
        appElement={document.getElementById("appContent")}
      >
        <h2 ref={subtitle => (this.subtitle = subtitle)}>{movie.title}</h2>
        <div>ID: {movie.id}</div>
        <div>
          Rating: {movie.vote_average} out of {movie.vote_count} votes.
        </div>
        <div>Popularity: {movie.popularity}</div>
        <img
          src={
            "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +
            movie.poster_path
          }
        />
        <div>Generes: {movie.genre_ids}</div>
        <div>backdrop_path: {movie.backdrop_path}</div>
        <div>Overview: {movie.overview}</div>
        <div>Release Date: {movie.release_date}</div>
        <div>Certification: {movie.certification}</div>
      </Modal>
    );
  }
}

export default MovieDetail;
