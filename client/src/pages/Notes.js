import React, { useState, useEffect, useContext } from "react";
import "../styles/Note.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
// import Edit from "./Edit";

function Notes() {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAuth = async () => {
      const response = await axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    };
    getAuth();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setListOfNotes(response.data);
    });
  }, []);

  const deleteNote = async (id) => {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3001/notes/${id}`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    console.log(response.data);
    navigate("/userprofile");
  };

  // const deleteNote = (id) => {
  //   axios.delete(`http://localhost:3001/notes/${id}`).then(() => {
  //     console.log(id);
  //   });
  // };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <div className="notes mt-5 pt-5">
              {listOfNotes.map((note, key) => {
                return (
                  <div
                    key={note.id}
                    className="note-container text-black mb-5 text-center "
                  >
                    <div
                      onClick={() => {
                        navigate(`/notes/${note.id}`);
                      }}
                      className="note__header"
                    >
                      {note.title}
                    </div>

                    <div
                      onClick={() => {
                        navigate(`/notes/${note.id}`);
                      }}
                      className="body note__body"
                    >
                      {note.text}
                    </div>

                    <div className="note__footer">
                      <h6>{note.username}</h6>
                      <h6>#:{note.id}</h6>
                      {authState.username === note.username && (
                        <button
                          className="btn btn-primary ps-4 pe-4 "
                          onClick={() => {
                            deleteNote(note.id);
                          }}
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
