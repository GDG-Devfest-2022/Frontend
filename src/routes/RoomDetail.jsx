import { Box } from "@chakra-ui/react";
import QueryString from "qs";
import { useRef, useState } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { socket } from "..";
import CHAT from "../components/chat/chat";

export default function RoomDetail() {
  const [chats, setChats] = useState([]);
  const { search } = useLocation();
  const queryData = QueryString.parse(search, {
    ignoreQueryPrefix: true,
  });
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

  return (
    <div>
      <Box css={{ width: "100vw", height: "100vh", display: "flex" }}>
        <ReactPlayer
          width="80vw"
          height="100vh"
          url={queryData.url}
          playing
          controls
        />
        <CHAT />
      </Box>
    </div>
  );
}
