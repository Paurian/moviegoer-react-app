import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

class MovieRating extends Component {
  render() {
    let { imdbRating, userRating, voteCount } = this.props;
    let stars = [];
    let rating = userRating || imdbRating / 2.0;
    let ratingClass = !!userRating
      ? "userRating"
      : voteCount < 10
      ? "imdbLowRating"
      : "imdbRating";
    let ratingTip =
      rating +
      (!!userRating ? " (Your Rating)" : " (IMDb Rating)") +
      (voteCount < 10 ? "<br/>fewer than 10 votes" : "");

    for (; rating - 0.5 > 0; rating--) {
      stars.push(
        <i key={stars.length} className={`fa fa-star rating ${ratingClass}`} />
      );
    }
    if (rating > 0) {
      stars.push(
        <i
          key={stars.length}
          className={`fa fa-star-half-o rating ${ratingClass}`}
        />
      );
    }
    for (var i = stars.length; i < 5; i++) {
      stars.push(
        <i
          key={stars.length}
          className={`fa fa-star-o rating ${ratingClass}`}
        />
      );
    }

    return (
      <span data-tip={ratingTip} data-for="global_rtt">
        {stars}
      </span>
    );
  }
}

export default MovieRating;
