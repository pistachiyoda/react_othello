import React from "react";

export const OthelloPlayer = (props) => {
    const { currentPlayer } = props;

    return (
        <div>
            <h2>{currentPlayer.name}[{currentPlayer.color}]の番です。</h2>
        </div>
    )    
}