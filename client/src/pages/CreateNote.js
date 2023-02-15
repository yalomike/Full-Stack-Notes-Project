import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicExample from "./Navbar";
import noteImage from "../images/—Pngtree—sticky note cartoon illustration_4597882.png";
import backgrounImage1 from "../images/y2017-06-04-05_generated.jpg";

function CreateNote() {
  const [form, setForm] = useState({ title: "", text: "" });
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/notes",
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
      data: form,
    });

    console.log(response);
    navigate("/userprofile");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  // function addNote() {
  //     setNotes((note) => [...note, form]);
  //     setForm({ title: "", text: "" });
  //   };
  // }

  return (
    <>
      <div>
        <BasicExample />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-6">
            <div className="createNote">
              <form onSubmit={onSubmit} className="note">
                <h2 className="text-dark text-center">Create a New Note</h2>
                <p className="text-dark text-center">
                  Feel free to write down anything you want.
                </p>

                <label className="label d-flex text-black mt-4">Title:</label>
                <textarea
                  className="inputNote border border-2"
                  cols="50"
                  rows="1"
                  placeholder="Type your title here...."
                  maxLength="100"
                  onChange={handleChange}
                  value={form.title}
                  name="title"
                ></textarea>

                <hr />

                <label className="label mb-3 text-black">Note Comment:</label>

                <div>
                  <textarea
                    className="inputNote border border-2 mb-4"
                    cols="34"
                    rows="5"
                    placeholder="Type your note here...."
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
}

export default CreateNote;
