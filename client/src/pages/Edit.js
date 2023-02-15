import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import BasicExample from "./Navbar";
import { AuthContext } from "../helpers/AuthContext";

const Edit = () => {
  const [form, setForm] = useState({ title: "", text: "" });
  const [listOfNotes, setListOfNotes] = useState([]);
  const { authState } = useContext(AuthContext);

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/notes/${id}`).then((response) => {
      setListOfNotes(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "put",
      url: `http://localhost:3001/notes/${id}`,
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      data: {
        newTitle: form.title,
        newText: form.text,
      },
    });
    navigate("/notes");
    return response;
  };

  // const editPost = () => {
  //   axios.put(
  //     "http://localhost:3001/notes/title",
  //     {
  //       id: id,
  //     },
  //     {
  //       headers: {
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     }
  //   );
  //   setListOfNotes({ ...listOfNotes });
  // };

  return (
    <>
      <div>
        <BasicExample />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-6">
            <div className="createNote">
              <form onSubmit={updateNote} className="note">
                <h2 className="text-dark text-center">Modify the note</h2>
                <p className="text-dark text-center">
                  Replace anything you want.
                </p>

                <label className="label d-flex text-black mt-4">
                  Modify the title:
                </label>
                <textarea
                  className="border border-2"
                  cols="50"
                  rows="1"
                  placeholder={listOfNotes.title}
                  maxLength="100"
                  onChange={handleChange}
                  type="text"
                  value={form.title}
                  name="title"
                ></textarea>

                <div className="createnote__footer"></div>

                <hr />

                <label className="label mb-3 text-black ">
                  Modify the text:
                </label>

                <div>
                  <textarea
                    className="border border-2 mb-4"
                    cols="34"
                    rows="5"
                    placeholder={listOfNotes.text}
                    maxLength="100"
                    onChange={handleChange}
                    value={form.text}
                    name="text"
                  ></textarea>

                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="submit"
                          className="btnCreateNote btn btn-outline-dark w-100"
                        >
                          Create
                        </button>
                      </div>
                      <div className="col-6">
                        <div>
                          <Link
                            className="btnCreateNote btn btn-outline-dark position-absolute w-100"
                            to="/userprofile"
                          >
                            Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
