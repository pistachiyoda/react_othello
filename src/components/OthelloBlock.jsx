import React from "react"
import _ from 'lodash'
import { OthelloAppModel } from "../model/OthelloAppModel";
import { PlayerModel } from "../model/PlayerModel";
import { OthelloBoardModel } from "../model/OthelloBoardModel";
import { OthelloBlockModel } from "../model/OthelloBlockModel";

const createUpdatedOthelloAppModel = (othelloAppModel) => {
    const blockModels =  [];
    for(let i = 0; i < 8; i++) {
        blockModels[i] = [];
        for(let j = 0; j < 8; j++) {
            blockModels[i][j] = new OthelloBlockModel(othelloAppModel.othelloBoardModel.blockModels[i][j].status); 
        }
    }
    // console.log(blockModels);
    const updatedOthelloAppModel =  new OthelloAppModel(
                                            new PlayerModel(othelloAppModel.player1, 'black'),
                                            new PlayerModel(othelloAppModel.player2, 'white'),
                                            othelloAppModel.currentPlayer,
                                            new OthelloBoardModel(blockModels, othelloAppModel.othelloBoardModel.leftEmptyBlocks))
    return updatedOthelloAppModel;
}

export const OthelloBlock = (props) => {
    const { x, y, block, othelloAppModel, setOthelloAppModel } = props;
    let statusClass = "";
    if (block.status === "black")
        statusClass = "disc_black"
    else if (block.status === "white")
        statusClass = "disc_white";

    return (
        <div className="block" onClick={() => {
            othelloAppModel.handleClick(x, y, othelloAppModel);
            setOthelloAppModel(createUpdatedOthelloAppModel(othelloAppModel));
        }}>
            <div className={statusClass}></div>
        </div>
    )
}