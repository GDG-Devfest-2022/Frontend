import './chat.css';
import {useState} from 'react';

function CHAT() {

  const [values, setValues] = useState("")

  const handleChange = e => {
    setValues(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(values)
  }

  return (
    <section id='chat-body'>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        autocomplete="off"
        value={values}
        onChange={handleChange}
      />
    </form>
    </section>
  );
}

export default CHAT;
