import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";
import tmdb from "../resources/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png";

class MovieNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryTitle: "Now Playing",
      sortTitle: "Release Date",
      searchString: "",
      searchStringIsDirty: false,
      sortBy: props.currentQueryOption.sortBy,
      currentQueryOption: props.currentQueryOption
    };
  }

  sortOptions = [
    { title: "Title (Ascending)", sortBy: "title.asc" },
    { title: "Title (Descending)", sortBy: "title.desc" },
    { title: "Rating (Ascending)", sortBy: "vote_average.asc" },
    { title: "Rating (Descending)", sortBy: "vote_average.desc" },
    { title: "Release Date (Ascending)", sortBy: "release_date.asc" },
    { title: "Release Date (Descending)", sortBy: "release_date.desc" },
    { title: "Popularity (Ascending)", sortBy: "popularity.asc" },
    { title: "Popularity (Descending)", sortBy: "popularity.desc" }
  ];

  updateSearchString = e => {
    this.setState({ searchString: e.target.value, searchStringIsDirty: true });
  };

  checkForSubmit = e => {
    if (e.charCode === 13) {
      this.onSearchClicked(this.state.searchString, this.state.sortBy, null);
    }
  };

  onSearchClicked = (searchString, sortBy, delegate) => {
    // console.log("Passing onSearchClicked request to props:");
    this.props.onSearchClicked(searchString, sortBy, null);
    this.setState({
      searchStringIsDirty: false,
      queryTitle: "Search Criteria"
    });
  };

  onCategoryMenuItemClicked = (e, c) => {
    let sortTitle = this.sortOptions.filter(s => s.sortBy === c.sortBy)[0]
      .title;
    // console.log("onCategoryMenuItemClicked sortBy = " + sortTitle);
    this.setState({
      queryTitle: c.title,
      sortTitle: sortTitle,
      searchString: "",
      searchStringIsDirty: false,
      sortBy: c.sortBy,
      currentQueryOption: c
    });
    this.props.onQueryOptionSelected(c.query, c.sortBy, null);
  };

  onSortMenuItemClicked = (e, s) => {
    this.setState({ sortBy: s.sortBy, sortTitle: s.title });
    this.props.onSortOptionSelected(s.sortBy);
  };

  render() {
    // console.log("Rendering movieNavBar");
    return (
      <Navbar className="navbar navbar-inverse navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a
              href="https://www.themoviedb.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className="tmdb_icon" src={tmdb} alt="The Movie Database" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown
              eventKey={4}
              title={this.state.queryTitle}
              id="nav-dropdown"
            >
              {this.props.queryOptions.map(c => (
                <MenuItem
                  key={c.query}
                  eventKey={c.query}
                  onClick={e => {
                    this.onCategoryMenuItemClicked(e, c);
                  }}
                >
                  {c.title}
                </MenuItem>
              ))}
            </NavDropdown>
            <NavDropdown
              eventKey={3}
              title={"Ordered By " + this.state.sortTitle}
              id="basic-nav-dropdown"
            >
              {this.sortOptions.map(s => (
                <MenuItem
                  key={s.sortBy}
                  eventKey={s.sortBy}
                  onClick={e => {
                    this.onSortMenuItemClicked(e, s);
                  }}
                >
                  {s.title}
                </MenuItem>
              ))}
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={this.updateSearchString}
                onKeyPress={this.checkForSubmit}
              />
              <Button
                type="submit"
                onClick={e => {
                  this.onSearchClicked(
                    this.state.searchString,
                    this.props.currentQueryOption.sortBy,
                    null
                  );
                }}
              >
                <span className="glyphicon glyphicon-search" />
              </Button>
            </FormGroup>{" "}
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MovieNavbar;
