import React from "react";
import ReactDOM from "react-dom";
import Movie from "./movie";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { getYear } from "./movie";

configure({ adapter: new Adapter() });

const movie = {
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
};

const onWantToWatchToggle = () => {
  console.log("handleWantToWatchToggle");
};

const onRated = () => {
  console.log("handleRated");
};

const onClearRating = () => {
  console.log("handleClearRating");
};

const onDetailRequest = () => {
  console.log("handleDetailRequest");
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Movie
      key={movie.id}
      movie={movie}
      onWantToWatchToggle={onWantToWatchToggle}
      onRated={onRated}
      onClearRating={onClearRating}
      onDetailRequest={onDetailRequest}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders movie title", () => {
  const wrapper = shallow(
    <Movie
      key={movie.id}
      movie={movie}
      onWantToWatchToggle={onWantToWatchToggle}
      onRated={onRated}
      onClearRating={onClearRating}
      onDetailRequest={onDetailRequest}
    />
  );
  expect(wrapper.contains(movie.title)).toEqual(true);
});

it("knows what year the date is in", () => {
  const wrapper = shallow(
    <Movie
      key={movie.id}
      movie={movie}
      onWantToWatchToggle={onWantToWatchToggle}
      onRated={onRated}
      onClearRating={onClearRating}
      onDetailRequest={onDetailRequest}
    />
  );
  expect(wrapper.instance().getYear("2018-12-07")).toEqual(2018);
});

it("splits my string alright", () => {
  const wrapper = shallow(
    <Movie
      key={movie.id}
      movie={movie}
      onWantToWatchToggle={onWantToWatchToggle}
      onRated={onRated}
      onClearRating={onClearRating}
      onDetailRequest={onDetailRequest}
    />
  );
  let expectedResult =
    "This is a somewhat<br/>long string that I<br/>want to split every<br/>20 characters.";
  expect(
    wrapper
      .instance()
      .splitStringLines(
        "This is a somewhat long string that I want to split every 20 characters.",
        20
      )
  ).toEqual(expectedResult);
});
