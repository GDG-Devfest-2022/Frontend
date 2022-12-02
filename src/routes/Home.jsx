import { Button, Center, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "..";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onValid = ({ roomName }) => {
    socket.emit("create-room", roomName, (response) => {
      if (!response.success) return alert(response.payload);
      navigate(`/rooms/${response.payload}`);
    });
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(onValid)}>
        <Input {...register("roomName", { required: true })} />
        <Button type="submit">방 참가 및 생성</Button>
      </form>
    </Center>
  );
}
