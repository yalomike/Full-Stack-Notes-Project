import { React, useState, useEffect, useContext } from "react";
import "../styles/Note.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Edit from "./Edit";

function Notes() {
  const [listOfNotes, setListOfNotes] = useState([]);
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setListOfNotes(response.data);
    });
  }, []);

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3001/notes/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/userprofile");
      });
  };

  // const editPost = (option) => {
  //   if (option === "title") {
  //     let newNoteTitle = prompt("Enter new title:");
  //     axios.put(
  //       "http://localhost:3001/notes/title",
  //       {
  //         newTitle: newNoteTitle,
  //         id: id,
  //       },
  //       {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       }
  //     );
  //     setListOfNotes({ ...listOfNotes, title: newNoteTitle });
  //   } else {
  //     let newNoteText = prompt("Enter new text:");
  //     axios.put(
  //       "http://localhost:3001/notes/noteText",
  //       {
  //         newText: newNoteText,
  //         id: id,
  //       },
  //       {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       }
  //     );
  //     setListOfNotes({ ...listOfNotes, text: newNoteText });
  //   }
  // };

  const { id } = useParams();

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
                    onClick={() => {
                      navigate(`/notes/${note.id}`);
                    }}
                    key={note.id}
                    className="note-container text-black mb-5 text-center "
                  >
                    <div
                      className="note__header"
                      // onClick={() => {
                      //   editPost("title");
                      // }}
                    >
                      {note.title}
                    </div>

                    <div
                      className="body note__body"
                      // onClick={() => {
                      //   editPost("body");
                      // }}
                    >
                      {note.text}
                    </div>

                    <div className="note__footer">
                      <h6>{note.username}</h6>
                      <h6>#:{note.id}</h6>
                    </div>
                    {/* {authState.username === listOfNotes.username && ( */}
                    <button
                      className="btn btn-primary ps-4 pe-4 w-25"
                      onClick={() => {
                        deleteNote(note.id);
                      }}
                    >
                      X
                    </button>
                    {/* )} */}
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
