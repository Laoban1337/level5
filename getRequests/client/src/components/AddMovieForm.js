import React, { useState } from "react";

export default function AddMovieForm(props) {
  const initInput = { title:props.title|| "", genre:props.genre|| "" };
  const [input, setInput] = useState(initInput);

  const handleOnchange = (e) => {
    console.log(input);
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };
  const handleSubmit = (e) => {
    props.submit(input,props._id);
    console.log(input);
    e.preventDefault();
    setInput(initInput);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        name="title"
        value={input.title}
        onChange={handleOnchange}
        placeholder="Title"
      />
      <input
        type="text"
        name="genre"
        value={input.genre}
        onChange={handleOnchange}
        placeholder="Genre"
      />
      <button>{props.btnText}</button>
    </form>
  );
}
