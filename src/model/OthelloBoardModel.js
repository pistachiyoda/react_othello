import { OthelloBlockModel } from "./OthelloBlockModel.js";

const vectors = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
];

export class OthelloBoardModel {
    #blockModels = [];
    #leftEmptyBlocks = 64;

    constructor(blockModels = null, leftEmptyBlocks = null) {
        if (!blockModels) {
            console.log("fuga");
            for(let i = 0; i < 8; i++) {
                this.#blockModels[i] = [];
                for(let j = 0; j < 8; j++) {
                    this.#blockModels[i][j] = new OthelloBlockModel(); 
                }
            }
            this.#blockModels[3][3].setWhite();
            this.#blockModels[4][4].setWhite();
            this.#blockModels[3][4].setBlack();
            this.#blockModels[4][3].setBlack();
        } else {
            console.log("hoge");
            this.blockModels = blockModels;
        }
        // console.log("======block Models in borad constructro======");
        // console.log(this.blockModels);
        this.leftEmptyBlocks = leftEmptyBlocks ? leftEmptyBlocks : this.reduceEmptyBlocks(4);
    }

    get blockModels() {
        return this.#blockModels;
    }

    get leftEmptyBlocks() {
        return this.#leftEmptyBlocks;
    }

    set blockModels(blockModels) {
        this.#blockModels = blockModels;
    }

    set leftEmptyBlocks(leftEmptyBlocks) {
        this.#leftEmptyBlocks = leftEmptyBlocks;
    }

    reduceEmptyBlocks(count) {
        this.#leftEmptyBlocks -= count;
    }

    isDispachable(x, y, othelloApp) {
        let boardModel = othelloApp.othelloBoardModel;
        if (!this.isEmpty(x, y, boardModel)) {
            window.alert("置けません１！");
            return false;
        }
        if (this.isSorroundedByEmptyBlock(x, y, boardModel)) {
            window.alert("置けません２！");
            return false;
        }
        if (!this.isLocatedNextOppositeColor(x, y, othelloApp)) {
            window.alert("置けません３！");
            return false;
        }
        if (!this.isSandwichedOfSameColor(x, y, othelloApp)) {
            window.alert("置けません4！");
            return false;
        }
        return true;
    }

    isEmpty(x, y, boardModel) {
        if (x < 0 || y < 0 || x > 7 || y > 7)
            return true;
        if (boardModel.blockModels[x][y].status !== "empty")
            return false;
        return true;
    }

    isSorroundedByEmptyBlock(x, y, boardModel) {
        return vectors.every(([xDir, yDir]) => this.isEmpty(x + xDir, y + yDir, boardModel));
    }

    isOppositeColor(x, y, othelloApp) {
        if (x < 0 || y < 0 || x > 7 || y > 7)
            return false;
        let discColor = othelloApp.othelloBoardModel.blockModels[x][y].status;
        if (discColor === othelloApp.currentPlayer.color || discColor === "empty" ) {
            return false;
        }
        return true;
    }

    isLocatedNextOppositeColor(x, y, othelloApp) {
        // 周囲に一つでもoppsite色の石がある
        return vectors.some(([xDir, yDir]) => this.isOppositeColor(x + xDir, y + yDir, othelloApp));
    }

    isSameColor(x, y, othelloApp) {
        if (x < 0 || y < 0 || x > 7 || y > 7)
            return false;
        let discColor = othelloApp.othelloBoardModel.blockModels[x][y].status;
        if (discColor === othelloApp.currentPlayer.color) {
            return true;
        }
        return false;
    }

    checkIsSandwiched(x, y, othelloApp, xDir, yDir, sandwichedBlocks = []) {
        x += xDir; //
        y += yDir; //
        while(x >= 0 && y >= 0 && x < 8 && y < 8) {
            if (this.isSameColor(x, y, othelloApp))
                return sandwichedBlocks;
            if (this.isEmpty(x, y, othelloApp.othelloBoardModel))
                break;
            sandwichedBlocks.push([x, y]);
            return this.checkIsSandwiched(x, y, othelloApp, xDir, yDir, sandwichedBlocks);
        }
        return [];
    }

    isSandwichedOfSameColor(x, y, othelloApp) {
        return vectors.some(([xDir, yDir]) => {
            let val = this.checkIsSandwiched(x, y, othelloApp, xDir, yDir);
            return val.length > 0;
        });
    }

    dispachDisc(x, y, othelloApp) {
        if (othelloApp.currentPlayer.color == "white")
            this.blockModels[x][y].setWhite();
        if (othelloApp.currentPlayer.color == "black")
            this.blockModels[x][y].setBlack();
        this.reduceEmptyBlocks(1);
    }

    updateDisc(x, y, othelloApp) {
        vectors.forEach(([xDir, yDir]) => {
            let sandwichedBlocks = this.checkIsSandwiched(x, y, othelloApp, xDir, yDir);
            if (sandwichedBlocks.length > 0) {
                sandwichedBlocks.forEach(([x, y]) => {
                    if (othelloApp.currentPlayer.color === "black")
                        othelloApp.othelloBoardModel.blockModels[x][y].setBlack();
                    if (othelloApp.currentPlayer.color === "white")
                        othelloApp.othelloBoardModel.blockModels[x][y].setWhite();
                });
            }
        });
    }

    isEnd(othelloApp) {
        if (othelloApp.othelloBoardModel.leftEmptyBlocks === 0)
        {
            console.log("終わり！");
            return true;
        }
        return false;
    }

    determineWinner(othelloApp) {
        let blackDiscs = 0;
        let whiteDiscs = 0;

        othelloApp.othelloBoardModel.blockModels.forEach((blocks, y) => {
            blocks.forEach((block, x) => {
                if (block.status === "black")
                    blackDiscs += 1;
                if (block.status === "white")
                    whiteDiscs += 1;
            })
        })
        return blackDiscs > whiteDiscs ? othelloApp.getPlayerName(othelloApp, "black") : othelloApp.getPlayerName(othelloApp, "white");
    }
}