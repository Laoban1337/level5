import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import ChoreForm from "./components/ChoreForm";
import Cleaner from "./components/Cleaner";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chore from "./components/Chore";
import AboutUs from "./components/AboutUs";

function App() {
  //get all cleaners
  useEffect(() => {
    getCleaners();
    //getChores?
    getChores();
  }, []);
  const [cleanerState, setCleanerState] = React.useState([]);
  const [chores, setChores] = React.useState([]);

  // fetchData
  const getCleaners = () => {
    axios
      .get("/cleaners")
      .then((res) => setCleanerState(res.data))
      .catch((err) => console.error(err.response.data.errMsg));
  };
  //Post one Cleaner to Db
  const addCleaner = (newCleaner) => {
    axios
      .post("/cleaners", newCleaner)
      .then((res) => {
        setCleanerState((prevCleaners) => [...prevCleaners, res.data]);
      })
      .catch((err) => console.log("there was an error :", err));
  };
  //remove cleaner from Db note: remove tasks assigned to deleted cleaners in future
  const deleteCleaner = (cleanerId) => {
    axios
      .delete(`/cleaners/${cleanerId}`)
      .then((res) =>
        setChores((prevCleaners) =>
          prevCleaners.filter((cleaner) => cleaner._id !== cleanerId)
        )
      )
      .catch((err) => console.log("There was an error:", err));
  };
  const updateCleaner = (cleanerId, updatedData) => {
    axios
      .put(`/cleaners/${cleanerId}`, updatedData)
      .then((res) => {
        setCleanerState((prevCleaners) =>
          prevCleaners.map((cleaner) =>
            cleaner._id === cleanerId ? res.data : cleaner
          )
        );
        console.log("Cleaner updated successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error updating cleaner:", err);
        // Handle error scenarios if needed
      });
  };
  

  console.log(chores);
  //fetch chores from Db
  const getChores = () => {
    axios
      .get("/chore")
      .then((res) => setChores(res.data))
      .catch((err) => console.error(err.errMsg));
  };
  //post one chore to DB
  const addChore = (newChore) => {
    axios
      .post("/chore", newChore)
      .then((res) => {
        setChores((prevChores) => [...prevChores, res.data]);
      })
      .catch((err) => console.log("there was an error :", err));
  };
  //remove deleted chore from Db
  const deleteChore = (choreId) => {
    axios
      .delete(`/chore/${choreId}`)
      .then((res) =>
        setChores((prevChores) =>
          prevChores.filter((chore) => chore._id !== choreId)
        )
      )
      .catch((err) => console.log("There was an error:", err));
  };
  //update
  const editChores = (updatedObject, choreId) => {
    axios
      .put(`/chore/${choreId}`, updatedObject)
      .then((res) => {
        setChores((prevChores) =>
          prevChores.map((chore) => (chore._id !== choreId ? chore : res.data))
        );
      })
      .catch((err) => err);
  };

  return (
    <Router>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route
            path="/chores"
            element={
              <Chore
                submit={addChore}
                choreState={chores}
                cleaners={cleanerState}
                onDelete={deleteChore}
                onEdit={editChores}
              />
            }
          />
          <Route
            path="/cleaners"
            element={
              <Cleaner
                cleaners={cleanerState}
                submit={addChore}
                onClick={addCleaner}
                chores={chores}
                onEdit={editChores}
                onDelete={deleteCleaner}
                updateCleaner={updateCleaner}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
