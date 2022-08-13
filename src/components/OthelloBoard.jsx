import React, { useState } from "react";
import { OthelloBlock } from "./OthelloBlock"

export const OthelloBoard = (props) => {
    const { othelloAppModel } = props;
    // 二次元配列はコンポーネントの中で展開できないので、一次元に直す
    const othelloBlocks = othelloAppModel.othelloBoardModel.blockModels.flatMap((blocks, x) => {
        return blocks.map((block, y) => {
            return (
                <OthelloBlock key={`${x}-${y}`} x={x} y={y} block={block}/>
            )
        })
    })
    return (
        <div id="board">
            {othelloBlocks}
        </div>
    )
}