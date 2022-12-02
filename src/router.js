import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Video from "./components/video/Video.js";
import Home from "./routes/Home";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "rooms/:roomName", element: <RoomDetail /> },
      { path: "Video", element: <Video /> },
    ],
  },
]);

export default router;
