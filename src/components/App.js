import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditMovie from "./EditMovie";

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  async componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const response = await axios.get("http://localhost:3001/movies");
    this.setState({ movies: response.data });
  }

  //   async componentDidMount() {
  //     const baseUrl = "http://localhost:3001/movies";
  //     const response = await fetch(baseUrl);
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     this.setState({ movies: data });
  //   }

  /*   deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    // this.setState({ movies: newMovieList });
    this.setState((state) => ({
      movies: newMovieList,
    }));
  }; */

  //FETCH API ile delete:

  //   deleteMovie = async (movie) => {
  //     const baseUrl = `http://localhost:3001/movies/${movie.id}`;
  //     await fetch(baseUrl, {
  //       method: "DELETE",
  //     });
  //     const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
  //     this.setState((state) => ({
  //       movies: newMovieList,
  //     }));
  //   };

  //Axios ile delete:

  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3001/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };

  addMovie = async (movie) => {
    await axios.post(`http://localhost:3001/movies/`, movie);

    this.setState((state) => ({
      movies: state.movies.concat(movie),
    }));
    this.getMovies();
  };

  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3001/movies/${id}`, updatedMovie);
    this.getMovies();
  };

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery) !== -1;
      })
      .sort((a, b) => {
        return a.id > b.id ? -1 : a.id < b.id ? 1 : 0; //sort methodu verilerden 2li setler alır. (a ve b) buları karşılaştırıp a.id < b.id ise 1 return et diyoruz yani
        // 1 demek sağdakini gönder demek yani (b.id); -1 return et demek soldakini göder demek yani: a.id. ikisi hariç durumda ise 0 gönder yani eşit.
      });

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    if (
                      movie.name &&
                      movie.overview &&
                      movie.rating &&
                      movie.imageUrl
                    ) {
                      this.addMovie(movie);
                      history.push("/");
                    } else {
                      alert("Invalid inputs.");
                    }
                  }}
                />
              )}
            ></Route>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    if (
                      movie.name &&
                      movie.overview &&
                      movie.rating &&
                      movie.imageUrl
                    ) {
                      this.editMovie(id, movie);
                    } else {
                      alert("Invalid inputs.");
                    }
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
