import React from "react";
import { OthelloBlock } from "./OthelloBlock"

export const OthelloBoard = (props) => {
    console.log("OthelloBoard rendered!");
    const { othelloAppModel, setOthelloAppModel } = props;
    const othelloBlocks = othelloAppModel.othelloBoardModel.blockModels.flatMap((blocks, x) => {
        return blocks.map((block, y) => {
            return (
                <OthelloBlock key={`${x}-${y}`} x={x} y={y} block={block} othelloAppModel={othelloAppModel} setOthelloAppModel={setOthelloAppModel}/>
            )
        })
    })
    return (
        <div id="board">
            {othelloBlocks}
        </div>
    )
}