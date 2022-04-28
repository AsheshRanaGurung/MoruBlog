// import React, { useState } from "react";
// import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// //s8l9wkk3

// const initialState = {
//   title: "",
//   description: "",
//   category: "",
//   imageUrl: "",
// };

// const options = [
//   "National News",
//   "International News",
//   "Business News",
//   "Multimedia News",
//   "Sports News",
// ];

// const AddEditpage = () => {
//   const [formValue, setFormValue] = useState(initialState);
//   const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);
//   const { title, description, category, imageUrl } = formValue;

//   const navigate = useNavigate();
//   const handleSubmit = (e) => {};
//   const onInputChange = (e) => {
//     let { name, value } = e.target.value;
//     // console.log(name);
//     console.log(value);
//     // setFormValue({...formValue,})
//   };
//   const onUploadImage = (file) => {
//     console.log(file);
//   };
//   const onFileChange = () => {};
//   return (
//     <>
//       <MDBValidation
//         // className="row g-3"
//         style={{ marginTop: "100px" }}
//         noValidate
//         onSubmit={handleSubmit}
//       >
//         <h2>AddEditpage</h2>
//         <div
//           style={{
//             margin: "auto",
//             padding: "15px",
//             maxWidth: "400px",
//             alignContent: "center",
//           }}
//         >
//           <MDBInput
//             value={title}
//             name="title"
//             type="text"
//             onChange={onInputChange}
//             required
//             label="Title"
//             validation="Please provide a Title"
//             // invalid
//           ></MDBInput>
//           <br />

//           <MDBInput
//             value={description}
//             name="description"
//             type="text"
//             onChange={onInputChange}
//             required
//             label="Description"
//             validation="Please provide a Description"
//             textarea="true"
//             rows={4}
//             // invalid
//           ></MDBInput>
//           <br />

//           <MDBInput
//             name="image"
//             type="file"
//             onChange={(e) => onUploadImage(e.target.files[0])}
//             required
//             validation="Please provide a File"
//             // invalid
//           ></MDBInput>
//           <br />

//           <select className="categorySelect" onChange={onFileChange}>
//             {/* <option>Please Select a category</option> */}
//             {options.map((item, index) => (
//               <option key={index} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>
//         <br />
//         <MDBBtn type="submit" style={{ marginRight: "10px" }}>
//           Submit
//         </MDBBtn>
//         <MDBBtn
//           color="danger"
//           style={{ marginRight: "10px" }}
//           onClick={() => navigate("/")}
//         >
//           Cancel
//         </MDBBtn>
//       </MDBValidation>
//     </>
//   );
// };

// export default AddEditpage;

import React, { useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const options = [
  "National News",
  "International News",
  "Business News",
  "Multimedia News",
  "Sports News",
];

const AddEditpage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  const [titleErrorMsg, setTitleErrorMsg] = useState(null);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);

  const navigate = useNavigate();

  const submitFormdata = (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrorMsg("Please select a category!");
    }
    if (title === "") {
      setTitleErrorMsg("Please write a title!");
    }
    console.log(title);
    console.log(description);
    console.log(category);
    console.log(image);
  };
  const onCategoryChange = (e) => {
    setCategoryErrorMsg(null);
    setCategory(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitleErrorMsg(null);
    setTitle(e.target.value);
  };
  const onUploadImage = (file) => {
    console.log(file);
  };

  return (
    <>
      <MDBValidation
        // className="row g-3"
        style={{ marginTop: "100px" }}
        noValidate
        onSubmit={submitFormdata}
      >
        <h2>AddEditpage</h2>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <MDBInput
            value={title}
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            label="Title"
            validation="Please provide a Title"
            invalid="true"
          ></MDBInput>
          <br />

          <select
            className="categorySelect"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {/* <option>Please Select a category</option> */}
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {categoryErrorMsg && (
            <div className="categoryErrorMsg">{categoryErrorMsg}</div>
          )}
          <br />
          <br />

          <MDBInput
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            validation="Please provide a File"
            // invalid
          ></MDBInput>
          <br />

          <textarea
            name="description"
            placeholder="Write your blog here..."
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
          />
          <br />
        </div>
        <br />

        <MDBBtn
          type="submit"
          style={{ marginRight: "10px" }}
          // onClick={() => submitFormdata()}
        >
          Submit
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </MDBBtn>
      </MDBValidation>
    </>
  );
};

export default AddEditpage;
