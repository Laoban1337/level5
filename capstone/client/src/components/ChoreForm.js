import React from "react";

export default function ChoreForm({ cleanerId, submit, onEdit }) {
  const initInput = {
    choreName: "",
    choreImage: "",
    estimatedChoreTime: 0,
    cleanerId: cleanerId || "",
    // choreComplete: props.choreComplete || false,
  };

  const [input, setInput] = React.useState(initInput);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // const newChore = {
    //   ...input,
    // };

    submit(input);
    setInput(initInput);
  };
  console.log(submit)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="choreName">Chore Name:</label>
        <input
          type="text"
          id="choreName"
          name="choreName"
          value={input.choreName}
          onChange={handleOnChange}
        />

        {/* <label htmlFor="choreImage">Chore Image Url:</label>
        <input
          type="text"
          id="choreImage"
          name="choreImage"
          value={input.choreImage}
          onChange={handleOnChange}
        /> */} 

        <label htmlFor="estimatedChoreTime">Estimated Chore Time:</label>
        <input
          type="number"
          id="estimatedChoreTime"
          name="estimatedChoreTime"
          value={input.estimatedChoreTime}
          onChange={handleOnChange}
        />

        {/* <label htmlFor="cleanerId">Cleaner:</label>
        <select
          id="cleanerId"
          name="cleanerId"
          value={input.cleanerId}
          onChange={handleOnChange}
        >
          <option value="">Select Cleaner</option>
          {cleaners && cleaners.map((cleaner) => (
            <option key={cleaner._id} value={cleaner._id}>
              {cleaner.cleanerName}
            </option>
          ))}
        </select> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
