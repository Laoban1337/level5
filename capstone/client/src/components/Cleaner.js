import React from "react";
import ChoreForm from "./../components/ChoreForm";

export default function Cleaner({ cleaners, submit, onClick, onDelete, onEdit,updateCleaner }) {
  const initInput = { cleanerName: "" };
  const [cleanerInput, setCleanerInput] = React.useState(initInput);
  const [editId, setEditId] = React.useState(null);
  const [editName, setEditName] = React.useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCleanerInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCleaners = { ...cleanerInput };
    onClick(newCleaners);
    setCleanerInput({ cleanerName: "" });
  };

  const handleEditChange = (e) => {
    setEditName(e.target.value);
  };

  const handleEditSubmit = (cleanerId) => {
    onEdit(cleanerId, { cleanerName: editName });
    setEditId(null);
    setEditName("");
  };

  const handleDelete = (cleanerId) => {
    onDelete(cleanerId);
  };

  const handleEdit = (cleanerId, currentName) => {
    setEditId(cleanerId);
    setEditName(currentName);
  };

  console.log("",updateCleaner)

  return (
    <>
      <h1>Cleaners Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cleanerName">Cleaner Name:</label>
        <input
          type="text"
          id="cleanerName"
          name="cleanerName"
          value={cleanerInput.cleanerName}
          onChange={handleOnChange}
        />
        <button type="submit">Add new Cleaner</button>
      </form>

      <div className="cleaner-box">
        <ul>
          {cleaners.map((cleaner) => (
            <li key={cleaner._id}>
              {editId === cleaner._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleEditSubmit(cleaner._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="cleaner-name">{cleaner.cleanerName}</div>
                  <button onClick={() => handleDelete(cleaner._id)}>Delete</button>
                  <button onClick={() => handleEdit(cleaner._id, cleaner.cleanerName)}>
                    Edit
                  </button>
                  <ChoreForm
                  onEdit={onEdit}
                    submit={submit}
                    cleanerId={cleaner._id}
                    cleaners={cleaners}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
