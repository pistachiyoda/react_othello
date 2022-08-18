import React from "react"

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
            setOthelloAppModel(othelloAppModel.createUpdatedOthelloAppModel(othelloAppModel));
        }}>
            <div className={statusClass}></div>
        </div>
    )
}