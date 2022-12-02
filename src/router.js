import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import VIDEO from "./components/video/video.js";
import Home from "./routes/Home";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "rooms/:roomName", element: <RoomDetail /> },
      { path: "video", element: <VIDEO />},
    ],
  },
]);

export default router;
