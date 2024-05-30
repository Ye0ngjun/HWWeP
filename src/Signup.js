// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleIdChange = (event) => {
//     setId(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = () => {
//     console.log("ID:", id);
//     console.log("Password:", password);
//   };

//   return (
//     <div>
//       <img src="/INU.png" alt="inu" width={300} />
//       <div className="flex flex-col items-center justify-center mt-24">
//         <div className="flex flex-col items-center justify-center gap-4 p-5 border-4 border-blue-800 rounded-lg h-60 w-96">
//           <p className="text-lg text-center">회원가입</p>
//           <input
//             type="text"
//             className="h-12 border border-black"
//             placeholder="  아이디"
//             value={id}
//             onChange={handleIdChange}
//           />
//           <input
//             type="password"
//             className="h-12 border border-black"
//             placeholder="  비번"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//           <button
//             className="w-24 h-12 bg-yellow-400 rounded-md hover:bg-yellow-500"
//             onClick={handleSubmit}
//           >
//             회원가입
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.id === id);

    if (userExists) {
      alert("유저가 이미 존재합니다.");
      return;
    }

    const newUser = { id, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입 성공");
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-24">
        <img src="/INU.png" alt="inu" width={300} />
        <div className="flex flex-col items-center justify-center gap-4 p-5 mt-4 border-4 border-blue-800 rounded-lg h-60 w-96">
          <p className="text-lg text-center">회원가입</p>
          <input
            type="text"
            className="h-12 border border-black"
            placeholder="  아이디"
            value={id}
            onChange={handleIdChange}
          />
          <input
            type="password"
            className="h-12 border border-black"
            placeholder="  비번"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="w-24 h-12 bg-yellow-400 rounded-md hover:bg-yellow-500"
            onClick={handleSignup}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
