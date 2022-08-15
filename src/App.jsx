import React, { useState } from "react";
import "./style.css";
import { OthelloBoard } from "./components/OthelloBoard";
import { PlayerModel } from "./model/PlayerModel";
import { OthelloAppModel } from "./model/OthelloAppModel";

function App() {
  // レンダリングされるとここからレンダリングされるので毎回新規作成されちゃう
  // そもそも最初2回実行されているのも謎
  console.log("piyopiyo");
  const [othelloAppModel, setOthelloAppModel] = useState(
    new OthelloAppModel(new PlayerModel('player1', 'black'), new PlayerModel('player2', 'white'))
  );

  return (
    <div>
      <OthelloBoard othelloAppModel={othelloAppModel} setOthelloAppModel={setOthelloAppModel}/>
    </div>
  );
}

export default App;
