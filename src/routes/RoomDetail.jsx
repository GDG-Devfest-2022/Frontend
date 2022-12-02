import { useEffect } from "react";

export default function RoomDetail() {
  useEffect(() => {
    const roomListHandler = (rooms) => {
      console.log(rooms);
      setRooms(rooms);
    };
    socket.emit("room-list", roomListHandler);

    return () => {
      socket.off("room-list", roomListHandler);
    };
  }, []);

  return <div></div>;
}
