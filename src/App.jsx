import React, { useState } from "react";
import "./style.css";
import { OthelloBoard } from "./components/OthelloBoard";
import { PlayerModel } from "./model/PlayerModel";
import { OthelloAppModel } from "./model/OthelloAppModel";

function App() {
  const Player1 = new PlayerModel("player1", "black");
  const Player2 = new PlayerModel("player2", "white");
  const othelloAppModel = new OthelloAppModel(Player1, Player2);

  // const [, set] = useState([]);

  return (
    <div>
      <OthelloBoard othelloAppModel={othelloAppModel}/>
    </div>
  );
}

export default App;
