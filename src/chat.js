import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [chatName, setChatName] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomExists, setRoomExists] = useState(false); // 방이 전에 있었는지 확인하는 state
  const [id, setId] = useState("");
  const [history, setHistory] = useState(false);
  const [length, setLength] = useState("");
  const onChatName = (event) => {
    setChatName(event.target.value);
  };

  const handleRoom = () => {
    joinRoom(chatName);
    setRoomExists(false);
    console.log(JSON.parse(localStorage.getItem(chatName)));
    if (chatName === JSON.parse(localStorage.getItem(chatName))[0].chatName) {
      setHistory(true);
      console.log(JSON.parse(localStorage.getItem(chatName)).length);
      setLength(JSON.parse(localStorage.getItem(chatName)).length);
    }
  };

  const handleSearch = () => {
    socket.emit("search:room", chatName, (response) => {
      if (response.exists) {
        setRoomExists(true);
      } else {
        setRoomExists(false);
        if (window.confirm("방이 존재하지 않습니다. 방을 만드시겠습니까?")) {
          socket.emit("create:room", chatName, (response) => {
            if (response.success) {
              alert("방 만들기 성공");
              joinRoom(chatName);
            } else {
              alert("방 만들기 실패");
            }
          });
        }
      }
    });
  };

  const joinRoom = (roomName) => {
    socket.emit("join:room", roomName);
  };

  useEffect(() => {
    setId(localStorage.getItem("loginuser"));
    socket.on("init", (data) => {
      setName(data.name);
      setUsers(data.users);
    });

    socket.on("user:join", (data) => {
      setUsers((prevUsers) => [...prevUsers, data.name]);
    });

    socket.on("send:message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: data.user, text: data.text },
      ]);
    });

    return () => {
      socket.off("init");
      socket.off("user:join");
      socket.off("send:message");
    };
  }, []);

  const handleSendMessage = () => {
    if (chatName) {
      const chatRoom = JSON.parse(localStorage.getItem(chatName)) || [];
      const currentDateTime = new Date();
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함.
      const day = currentDateTime.getDate();
      const hour = currentDateTime.getHours();
      const minute = currentDateTime.getMinutes();
      const second = currentDateTime.getSeconds();
      const time = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
      const newMessage = { user: name, text: message, time };

      if (message.trim() !== "") {
        socket.emit("send:message", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const newChat = { id, message, time, chatName };
        chatRoom.push(newChat);
        localStorage.setItem(chatName, JSON.stringify(chatRoom));
        setMessage("");
      } else {
        alert("메시지를 입력하세요.");
      }
    } else {
      alert("먼저 방에 들어가주세요.");
    }
  };

  return (
    <div>
      <img src="/INU.png" alt="inu" width={300} className="m-5" />
      <div className="flex mt-4">
        <div>
          <img src="/icon.png" alt="icon" width={70} />
        </div>
        <div className="flex flex-col h-[86vh] bg-gray-50 w-80 p-4">
          <input
            type="text"
            className="w-full m-2 border border-black rounded-md h-7"
            value={chatName}
            onChange={onChatName}
          />
          <button
            onClick={handleSearch}
            className="m-2 bg-gray-200 rounded-md h-7 hover:bg-blue-500"
          >
            방 검색
          </button>
          {roomExists && (
            <div
              className="m-2 text-center border hover:bg-blue-600 "
              onClick={handleRoom}
            >
              {chatName} 의 채팅방
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between w-full p-4 bg-gray-300 border border-black h-">
          {history && (
            <div>
              {JSON.parse(localStorage.getItem(chatName))
                ?.slice(0, length)
                ?.map((item, index) => (
                  <div key={index} className="flex flex-col justify-start mb-2">
                    <strong>{item.id}: </strong>
                    <p>{item.message}</p>
                    <p>{item.time}</p>
                  </div>
                ))}
            </div>
          )}
          <div className="flex justify-end">
            <div className="flex flex-col overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col justify-end mb-2">
                  <strong>{id}: </strong>
                  <p>{msg.text}</p>
                  <p>{msg.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-black rounded-md h-7"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-gray-200 rounded-md h-7 hover:bg-blue-500"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
