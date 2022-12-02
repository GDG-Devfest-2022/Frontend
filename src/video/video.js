import './video.css';
import CHAT from './chat/chat.js';
import ReactPlayer from 'react-player'

function VIDEO() {
  return (
    <main id="video-rendering">
    <ReactPlayer
    width='80vw'
    height='100vh'
    url='https://youtu.be/FJfwehhzIhw'  playing   controls/>
      <CHAT />
    </main>
  );
}

export default VIDEO;
