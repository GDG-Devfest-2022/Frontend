import { Box, Button, Center, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "..";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onValid = ({ roomName, VideoUrl }) => {
    socket.emit("create-room", roomName, (response) => {
      if (!response.success) return alert(response.payload);
      navigate(`/rooms/${response.payload}?url=${VideoUrl}`);
    });
  };

  return (
    <Center css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Heading mb={5}>Guess Match</Heading>
      <Box
        onSubmit={handleSubmit(onValid)}
        as="form"
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input
          {...register("roomName", { required: true })}
          placeholder="방 이름"
          mb={2}
        />
        <Input
          {...register("VideoUrl", { required: true })}
          placeholder="영상 주소"
          mb={5}
        />
        <Button type="submit">방 참가 및 생성</Button>
      </Box>
    </Center>
  );
}
