import React, { useState, useEffect } from "react";
import "../styles/Note.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

function Notes() {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let navigate = useNavigate();

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
  }, [authState]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
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
    navigate("/userprofile");
    return response;
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row ms-1">
          <div className="col-lg-12 col-md-6 pt-5">
            <h1 className="text-center pt-4 ms-5">
              <strong className="text-decoration-underline d-none d-sm-block">
                NOTES
              </strong>
            </h1>
            <div className="notes">
              {listOfNotes.map((note, key) => {
                return (
                  <div
                    key={note.id}
                    className="note-container text-white text-center "
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
                      className="body text-black note__body"
                    >
                      {note.text}
                    </div>

                    <div className="note__footer">
                      <h6>{note.username} </h6>
                      <h6>#:{note.id}</h6>

                      {authState.username === note.username && (
                        <button
                          className="btn btn-light ps-4 pe-4 "
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
