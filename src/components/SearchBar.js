import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row my-5 d-flex justify-content-center">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search a movie"
              onChange={this.props.searchMovieProp}
            />
          </div>
          <div className="col-2 ms-5">
            <Link type="button" className="btn btn-outline-danger" to="/add">
              Add Movie
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
