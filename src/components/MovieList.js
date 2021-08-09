import React from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  //Truncate overview string to limit
  const truncateOveview = (string, maxLength) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)}...`;
  };

  return (
    <div className="row">
      {props.movies.map((movie, i) => (
        <div className="col-lg-4" key={i}>
          <div className="col-lg-12 p-5 h-100">
            <div className="card mb-4 shadow-sm h-100">
              <img
                src={movie.imageUrl}
                className="card-img-top img-thumbnail"
                alt={movie.name}
              ></img>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">
                  {truncateOveview(movie.overview, 200)}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <button
                      className="btn btn-md btn-outline-danger"
                      onClick={(e) => props.deleteMovieProp(movie)}
                    >
                      Delete
                    </button>
                    <Link
                      type="button"
                      className="btn btn-md btn-outline-primary mx-2"
                      to={`edit/${movie.id}`}
                    >
                      Edit
                    </Link>
                  </div>
                  <h5>
                    <span className="badge bg-secondary bg-sm">
                      {movie.rating}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
