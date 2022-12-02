import "./video.css";
import CHAT from "../chat/chat.js";
import ReactPlayer from "react-player";

function Video({ url }) {
  return (
    <main id="Video-rendering">
      <ReactPlayer width="80vw" height="100vh" url={url} playing controls />
      <CHAT />
    </main>
  );
}

export default Video;
