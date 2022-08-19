import React, { useState } from "react";
import "./style.css";
import { OthelloBoard } from "./components/OthelloBoard";
import { PlayerModel } from "./model/PlayerModel";
import { OthelloAppModel } from "./model/OthelloAppModel";
import { OthelloPlayer } from "./components/OthelloPlayer";


function App() {
  const [othelloAppModel, setOthelloAppModel] = useState(
    new OthelloAppModel(new PlayerModel('player1', 'black'), new PlayerModel('player2', 'white'))
  );

  return (
    <div>
      <h1>React Othello App</h1>
      <OthelloPlayer currentPlayer={othelloAppModel.currentPlayer}/>
      <button onClick={() => {othelloAppModel.switchPlayer();
                              setOthelloAppModel(othelloAppModel.createUpdatedOthelloAppModel(othelloAppModel));}}>パスする</button>
      <OthelloBoard othelloAppModel={othelloAppModel} setOthelloAppModel={setOthelloAppModel}/>
    </div>
  );
}

export default App;
