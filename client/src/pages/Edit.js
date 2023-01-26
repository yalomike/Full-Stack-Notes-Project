import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BasicExample from "./Navbar";
import { AuthContext } from "../helpers/AuthContext";

const Edit = () => {
  const [form, setForm] = useState({ title: "", text: "" });
  const [listOfNotes, setListOfNotes] = useState([]);
  const { authState } = useContext(AuthContext);

  const { id } = useParams();

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
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        newTitle: form.title,
        newText: form.text,
      }),
    });
    console.log(response);
  };

  // console.log(form);

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
          <div className="col-lg-12">
            <div className="containerNotes">
              <form onSubmit={updateNote} className="note">
                <label className="label d-flex text-black">
                  Modify the title:
                </label>
                <textarea
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
                    cols="67"
                    rows="5"
                    placeholder={listOfNotes.text}
                    maxLength="100"
                    onChange={handleChange}
                    value={form.text}
                    name="text"
                  ></textarea>

                  <div className="createnote__footer">
                    <button type="submit" className="note__save">
                      Save Changes
                    </button>
                    <Link className="note__save" to="/userprofile">
                      Home
                    </Link>
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

//   <div className="postPage mt-5 pt-5">
//   <div className="individual">
//     <div className="leftSide">
//       <div
//         className="title"
//         onClick={() => {
//           if (authState.username === listOfNotes.username) {
//             editPost("title");
//           }
//         }}
//       >
//         {listOfNotes.title}
//       </div>
//       <div
//         className="body"
//         onClick={() => {
//           if (authState.username === listOfNotes.username) {
//             editPost("body");
//           }
//         }}
//       >
//         {listOfNotes.text}
//       </div>
//       <div className="footer">
//         {listOfNotes.username}
//         {authState.username === listOfNotes.username && (
//           <button>Delete Post</button>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

//   useEffect(() => {
//     const editPost = (option) => {
//       if (option === "title") {
//         const newNoteTitle = form;

//         axios.put(
//           "http://localhost:3001/notes/title",
//           {
//             newTitle: newNoteTitle,
//             id: id,
//           },
//           {
//             headers: {
//               accessToken: localStorage.getItem("accessToken"),
//             },
//           }
//         );
//         setListOfNotes({ ...listOfNotes, title: newNoteTitle });
//       } else {
//         const newNoteText = form;
//         axios.put(
//           "http://localhost:3001/notes/text",
//           {
//             newText: newNoteText,
//             id: id,
//           },
//           {
//             headers: {
//               accessToken: localStorage.getItem("accessToken"),
//             },
//           }
//         );
//         setListOfNotes({ ...listOfNotes, title: newNoteText });
//       }
//     };
//   }, []);

//   useEffect(() => {
//     axios
//       .put(
//         `http://localhost:3001/notes/${id}`,
//         {
//           headers: { accessToken: localStorage.getItem("accessToken") },
//         },
//         { data: { id: id, newTitle: form.title, newText: form.text } }
//       )
//       .then((response) => {
//         setForm(response.data);
//       });
//   }, []);

//   const editPost = (e) => {
//     e.preventDefault();
//     setForm();
//   };

//   let navigate = useNavigate();

//   useEffect(() => {
//     async function editPost(e) {
//       e.preventDefault();
//       const response = await axios({
//         method: "put",
//         url: `http://localhost:3001/notes/${id}`,
//         headers: {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//         data: { id: id, newTitle: form.title, newText: form.text },
//       });
//       response.then((data) => {
//         setForm(data);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const response = await axios({
//         method: "put",
//         url: `http://localhost:3001/notes/${id}`,
//         headers: {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//         data: { id: id, newTitle: form.title, newText: form.text },
//       });
//       setForm(response.data);
//     }

//   },[]);

//   async function editPost(e) {
//     e.preventDefault();
