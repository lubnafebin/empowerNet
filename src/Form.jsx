// import { useState } from "react";

// export const FormComponent = () => {
//   const [values, setValues] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     contact: "",
//     gender: "",
//   });
//   const handleChanges = (e) => {
//     setValues({ ...values, [e.target.name]: [e.target.value] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//   };
//   return (
//     <div>
//       <h1>Form in react</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="firstname">First name</label>
//         <input
//           type="text"
//           placeholder="Enter first name"
//           name="firstname"
//           onChange={(e) => handleChanges(e)}
//           required
//         />
//         <label htmlFor="lastname">Last name</label>
//         <input
//           type="text"
//           placeholder="Enter last name"
//           name="lastname"
//           onChange={(e) => handleChanges(e)}
//           required
//         />
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           name="email"
//           onChange={(e) => handleChanges(e)}
//         />
//         <label htmlFor="contact">Contact</label>
//         <input
//           type="text"
//           placeholder="Enter Contact"
//           name="contact"
//           onChange={(e) => handleChanges(e)}
//         />
//         <label htmlFor="gender">Gender</label>
//         <input
//           type="radio"
//           name="gender"
//           value="Male"
//           onChange={(e) => handleChanges(e)}
//         />
//         Male
//         <input
//           type="radio"
//           name="gender"
//           value="Female"
//           onChange={(e) => handleChanges(e)}
//         />
//         Female
//         <input
//           type="radio"
//           name="gender"
//           value="Other"
//           onChange={(e) => handleChanges(e)}
//         />
//         Other
//         <button type="reset">Reset</button>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
