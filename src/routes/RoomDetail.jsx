import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "..";

export default function RoomDetail() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { roomName } = useParams();
  const navigate = useNavigate();
  const chatContainerEl = useRef(null);

  useEffect(() => {
    if (!chatContainerEl.current) return;

    const chatContainer = chatContainerEl.current;
    const { scrollHeight, clientHeight } = chatContainer;

    if (scrollHeight > clientHeight) {
      chatContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, [chats.length]);

  useEffect(() => {
    const messageHandler = (chat) =>
      setChats((prevChats) => [...prevChats, chat]);

    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  const onLeaveRoom = () => {
    socket.emit("leave-room", roomName, () => {
      navigate("/");
    });
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    if (!message) return alert("메시지를 입력해 주세요.");

    socket.emit("message", { roomName, message }, (chat) => {
      setChats((prevChats) => [...prevChats, chat]);
      setMessage("");
    });
  };

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <button onClick={onLeaveRoom}>방 나가기</button>
      <div ref={chatContainerEl}>
        {chats.map((chat, index) => (
          <div key={index}>
            <span className="message">{chat.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={onSendMessage}>
        <input type="text" onChange={onChange} value={message} />
        <button>보내기</button>
      </form>
    </div>
  );
}
