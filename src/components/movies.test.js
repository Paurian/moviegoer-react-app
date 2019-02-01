import React from "react";
import ReactDOM from "react-dom";
import Movies from "./movies";

const movies = [
  {
    vote_count: 1883,
    id: 297802,
    video: false,
    vote_average: 7,
    title: "Aquaman",
    popularity: 608.999,
    poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
    original_language: "en",
    original_title: "Aquaman",
    genre_ids: [28, 14, 878, 12],
    backdrop_path: "/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg",
    adult: false,
    overview:
      "Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.",
    release_date: "2018-12-07"
  },
  {
    vote_count: 565,
    id: 424783,
    video: false,
    vote_average: 6.6,
    title: "Bumblebee",
    popularity: 380.017,
    poster_path: "/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg",
    original_language: "en",
    original_title: "Bumblebee",
    genre_ids: [28, 12, 878],
    backdrop_path: "/8bZ7guF94ZyCzi7MLHzXz6E5Lv8.jpg",
    adult: false,
    overview:
      "On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.  When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.",
    release_date: "2018-12-15"
  },
  {
    vote_count: 476,
    id: 400650,
    video: false,
    vote_average: 7,
    title: "Mary Poppins Returns",
    popularity: 277.951,
    poster_path: "/uTVGku4LibMGyKgQvjBtv3OYfAX.jpg",
    original_language: "en",
    original_title: "Mary Poppins Returns",
    genre_ids: [14, 10402, 10751, 35],
    backdrop_path: "/cwiJQXezWz876K3jS57Sq56RYCZ.jpg",
    adult: false,
    overview:
      "In Depression-era London, a now-grown Jane and Michael Banks, along with Michael's three children, are visited by the enigmatic Mary Poppins following a personal loss. Through her unique magical skills, and with the aid of her friend Jack, she helps the family rediscover the joy and wonder missing in their lives.",
    release_date: "2018-12-19"
  }
];

const handleWantToWatchToggle = () => {
  console.log("handleWantToWatchToggle");
};

const handleRated = () => {
  console.log("handleRated");
};

const handleClearRating = () => {
  console.log("handleClearRating");
};

const handleDetailRequest = () => {
  console.log("handleDetailRequest");
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Movies
      movies={movies}
      onWantToWatchToggle={handleWantToWatchToggle}
      onRated={handleRated}
      onClearRating={handleClearRating}
      onDetailRequest={handleDetailRequest}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
