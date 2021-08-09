import axios from "axios";
import React, { Component } from "react";

export default class EditMovie extends Component {
  state = {
    name: "",
    rating: "",
    overview: "",
    imageUrl: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    //console.log(id);
    const response = await axios.get(`http://localhost:3001/movies/${id}`);
    const movie = response.data;

    this.setState({
      name: movie.name,
      rating: movie.rating,
      overview: movie.overview,
      imageUrl: movie.imageUrl,
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    // Edited data post to json db
    // Long way
    // const name = this.state.name;
    // const rating = this.state.rating;
    // const imageUrl = this.state.imageUrl;
    // const overview = this.state.overview;

    // Short-way: (Object Destructing)
    const { name, rating, imageUrl, overview } = this.state;
    const id = this.props.match.params.id;

    const updatedMovie = {
      //Long way
      // name:name,
      // rating:rating,
      // imageUrl:imageUrl,
      // overview:overview,

      // Nesne propery ile value name aynı ise aşağıdaki gibi yazılabilir.
      name,
      rating,
      imageUrl,
      overview,
    };
    this.props.onEditMovie(id, updatedMovie);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <center>
          <h3 className="m-5">Edit Movie </h3>
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
                  value={this.state.name}
                  placeholder="Interstellar"
                  onChange={this.onInputChange}
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
                  value={this.state.rating}
                  placeholder="7.3"
                  onChange={this.onInputChange}
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
              value={this.state.imageUrl}
              placeholder="Image Url"
              onChange={this.onInputChange}
            />
            <label htmlFor="floatingimageUrl">Image Url:</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="overview"
              name="overview"
              value={this.state.overview}
              placeholder="Overview"
              style={{ height: "150px" }}
              onChange={this.onInputChange}
            />
            <label htmlFor="floatingOverview">Overview:</label>
          </div>
          <input
            type="submit"
            className="btn btn-outline-primary w-100"
            value="Save Changes"
          ></input>
        </form>
      </div>
    );
  }
}
