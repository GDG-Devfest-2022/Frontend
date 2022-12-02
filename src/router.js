import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "rooms/:roomId", element: <RoomDetail /> },
    ],
  },
]);

export default router;
