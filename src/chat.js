import { useState } from "react";
import "./App.css";
function App() {
  const [chatName, setChatName] = useState("");
  const onChatName = (event) => {
    setChatName(event.target.value);
  };
  const handleSearch = () => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const roomExists = rooms.find((room) => room.chatName === chatName);
    if (roomExists) {
      alert("방이 이미 존재합니다.");
      return;
    }
    const newRoom = { chatName };
    rooms.push(newRoom);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    alert("방 만들기 성공");
    console.log(chatName);
  };
  return (
    <div>
      <img src="/INU.png" alt="inu" width={300} className="m-5" />
      <div className="flex mt-4">
        <div>
          <img src="/icon.png" alt="icon" width={70} />
        </div>
        <div className="flex h-[585px] bg-gray-50 w-80">
          <input
            type="text"
            className="w-64 m-2 border border-black rounded-md h-7 "
            value={chatName}
            onChange={onChatName}
          />
          <button
            onClick={handleSearch}
            className="m-2 bg-gray-200 rounded-md h-7 w-14 hover:bg-blue-500"
          >
            검색
          </button>
        </div>
        <div className="w-screen h-[585px] bg-gray-300 border border-black"></div>
      </div>
    </div>
  );
}
export default App;
