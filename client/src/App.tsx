import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Incoming from "./incoming/incoming";
import Voicemail from "./voicemail/voicemail";
import Numpad from "./numpad/numpad";
import RealTimeComponent from "./websockets/websockets";
import Incall from "./incall/incall";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/incoming" element={<Incoming></Incoming>}></Route>
            <Route path="/voicemail" element={<Voicemail></Voicemail>}></Route>
            <Route path="/" element={<Numpad></Numpad>}></Route>
            <Route
              path="/real"
              element={<RealTimeComponent></RealTimeComponent>}
            ></Route>
            <Route path="/call" element={<Incall></Incall>}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
