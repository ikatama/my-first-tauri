import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  function executeCommands() {
    invoke('simple_command')

    invoke('command_with_message', { message: 'Halo' }).then(message => {
      console.log('command_with_message', message)
    })

    invoke('command_with_object', { message: { field_str: 'Halo', field_u32: 16 } }).then(message => {
      console.log('command_with_object', message)
    })

    for (let arg of [1, 2, 3]) {
      invoke('command_with_error', { arg }).then(message => {
        console.log('command_with_error', message)
      }).catch(message => {
        console.error('command_with_error', message)
      })
    }

    invoke('async_command', { arg: 10 }).then(message => {
      console.log('async_command', message)
    })

  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>Hello My First Tauri</p>

      <div>Hello Tauri.</div>
      <button onClick={executeCommands}>Execute Commands</button>
    </div>
  );
}

export default App;
