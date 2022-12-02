import QueryString from "qs";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { socket } from "..";
import Video from "../components/video/Video";

export default function RoomDetail() {
  const [chats, setChats] = useState([]);
  const { roomName } = useParams();
  const { search } = useLocation();
  const queryData = QueryString.parse(search, {
    ignoreQueryPrefix: true,
  });
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

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <Video url={queryData.url} />
      <button onClick={onLeaveRoom}>방 나가기</button>
    </div>
  );
}
