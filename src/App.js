import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.id === id && user.password === password
    );

    if (user) {
      alert("로그인 성공");
      localStorage.setItem("loginuser", id);
      navigate("/chat");
    } else {
      alert("로그인 실패");
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-24">
        <img src="/INU.png" alt="inu" width={300} />
        <div className="flex flex-col items-center justify-center gap-4 p-5 mt-4 border-4 border-blue-800 rounded-lg h-60 w-96">
          <p className="text-lg text-center">로그인</p>
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
          <div className="flex">
            <button
              className="w-24 h-10 mr-10 bg-yellow-400 rounded-md hover:bg-yellow-500"
              onClick={handleLogin}
            >
              로그인
            </button>
            <button
              className="w-24 h-10 bg-yellow-400 rounded-md hover:bg-yellow-500"
              onClick={handleSignup}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
