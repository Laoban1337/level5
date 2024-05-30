import React, { useState } from "react";
import AddMovieForm from "./AddMovieForm";

export default function Movie(props) {
  const { title, genre, _id, editMovies } = props;
  const [editToggle, setEditToggle] = useState(false);

  return (
    <div>
      {!editToggle ? (
        
        <div className="movie-box">
          <h1>{title}</h1>
          <p>{genre}</p>
          <button
            className="deleteButton"
            onClick={() => props.deleteMovie(_id)}
          >
            Delete
          </button>
          <button
            className="editButton"
            onClick={() => setEditToggle((prevToggle) => !prevToggle)}
          >
            edit
          </button>
          </div>
        
      ) : (
        <>
          <AddMovieForm
            title={title}
            genre={genre}
            _id={_id}
            btnText="submit edit"
            submit={editMovies}
          />
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            close
          </button>
        </>
      )}
    </div>
  );
}
