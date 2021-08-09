import React, { Component } from "react";
import serialize from "form-serialize";

export default class AddMovie extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    // debugger;
    // if (e.target.name.innerText !== "") {
    //   const newMovie = serialize(e.target, { hash: true });
    //   this.props.onAddMovie(newMovie);
    // }
    // console.log(e.target);
    const newMovie = serialize(e.target, { hash: true });
    this.props.onAddMovie(newMovie);
  };

  render() {
    return (
      <div className="container">
        <center>
          <h3 className="m-5">Add Movie </h3>
        </center>
        <form onSubmit={this.handleFormSubmit} id="addForm">
          <div className="row">
            <div className="col-sm-8">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Interstellar"
                />
                <label htmlFor="floatingName">Name:</label>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-floating mb-3 my-3">
                <input
                  type="text"
                  className="form-control"
                  id="rating"
                  name="rating"
                  placeholder="7.3"
                />
                <label htmlFor="floatingRating">Rating:</label>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image Url"
            />
            <label htmlFor="floatingimageUrl">Image Url:</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="overview"
              name="overview"
              placeholder="Overview"
              style={{ height: "150px" }}
            />
            <label htmlFor="floatingOverview">Overview:</label>
          </div>
          <input
            type="submit"
            className="btn btn-outline-success w-100"
            value="Add Movie"
          ></input>
        </form>
      </div>
    );
  }
}
