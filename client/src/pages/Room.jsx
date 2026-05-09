import { useParams } from "react-router-dom";
import Canvas from "../components/Canvas";

const Room = () => {
  const { roomId } = useParams();

  return <Canvas roomId={roomId} />;
};

export default Room;