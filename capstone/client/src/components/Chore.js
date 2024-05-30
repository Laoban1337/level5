import React, { useEffect, useState } from "react";
import axios from "axios";
import ChoreForm from "./ChoreForm";

export default function Chores({
  choreState,
  cleaners,
  onEdit,
  submit,
  onDelete,
}) {
  const [chores, setChores] = useState([]);
  const [editToggle, setEditToggle] = useState(false);
  const [editedChore, setEditedChore] = useState(null);

  useEffect(() => {
    getChores();
  }, []);

  const getChores = () => {
    axios
      .get("/chore")
      .then((res) => setChores(res.data))
      .catch((err) => console.error(err));
  };

  const getCleanerName = (cleanerId) => {
    const cleaner = cleaners.find((cleaner) => cleaner._id === cleanerId);
    return cleaner ? cleaner.cleanerName : "Unknown";
  };

  const handleEdit = (choreId) => {
    const choreToEdit = choreState.find((chore) => chore._id === choreId);
    setEditedChore(choreToEdit);
    setEditToggle(true);
  };

  const handleEditSubmit = () => {
    if (!editedChore) return; // Return if editedChore is not set
    axios
      .put(`/chore/${editedChore._id}`, editedChore)
      .then((res) => {
        setChores((prevChores) =>
          prevChores.map((chore) =>
            chore._id !== editedChore._id ? chore : res.data
          )
        );
        setEditToggle(false);
        setEditedChore(null);
      })
      .catch((err) => console.error("There was an error:", err));
  };

  const handleDelete = (choreId) => {
    onDelete(choreId);
  };

  const handleCheckboxChange = (choreId) => {
    // Handle checkbox change
    const updatedChores = chores.map((chore) =>
      chore._id === choreId ? { ...chore, completed: !chore.completed } : chore
    );
    setChores(updatedChores);
  };

  return (
    <div>
      {!editToggle ? (
        <>
          <h1>Chores</h1>
          {choreState.map((chore) => (
            <div key={chore._id} className="chore-box">
              <h2>{getCleanerName(chore.cleaner)}'s Chores</h2>
              <ul>
                <li
                  key={chore._id}
                  className={chore.completed ? "completed-chore" : ""}
                >
                  {chore.choreName} - {getCleanerName(chore.cleaner)}
                  <button onClick={() => handleEdit(chore._id)}>Edit</button>
                  <button onClick={() => handleDelete(chore._id)}>
                    Delete
                  </button>
                  <input
                    type="checkbox"
                    checked={chore.completed}
                    onChange={() => handleCheckboxChange(chore._id)}
                  />
                </li>
              </ul>
            </div>
          ))}
        </>
      ) : (
        <ChoreForm
          onEdit={onEdit}
          submit={submit}
          chore={editedChore}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditToggle(false)}
        />
      )}
    </div>
  );
}
