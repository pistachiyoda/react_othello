import { PlayerModel } from "./PlayerModel";
import { OthelloBoardModel } from "./OthelloBoardModel";
import { OthelloBlockModel } from "./OthelloBlockModel";

export class OthelloAppModel{
    #currentPlayer;
    #player1;
    #player2;
    #othelloBoardModel;

    constructor(player1, player2, currentPlayer = null, othelloBoardModel = null) {
        this.initialize(player1, player2, currentPlayer, othelloBoardModel);
    }

    initialize(player1, player2, currentPlayer = null, othelloBoardModel = null) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = currentPlayer ? currentPlayer : this.player1;
        this.othelloBoardModel = othelloBoardModel ? othelloBoardModel : new OthelloBoardModel();
    }

    get currentPlayer() {
        return this.#currentPlayer;
    }

    get othelloBoardModel() {
        return this.#othelloBoardModel;
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    set currentPlayer(player) {
        this.#currentPlayer = player
    }

    set player1(player) {
        this.#player1 = player
    }

    set player2(player) {
        this.#player2 = player
    }

    set othelloBoardModel(othelloBoardModel) {
        this.#othelloBoardModel = othelloBoardModel;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer.name === this.player1.name ? this.player2 : this.player1;
    }

    handleClick(x, y, othelloApp) {
        if (!this.othelloBoardModel.isDispachable(x, y, othelloApp))
            return;
        this.othelloBoardModel.dispachDisc(x, y, othelloApp);
        this.othelloBoardModel.updateDisc(x, y, othelloApp);
        this.switchPlayer();
    }

    getPlayerName(othelloApp, color) {
        return othelloApp.player1.color === color ? othelloApp.player1.name : othelloApp.player2.name; 
    }

    createUpdatedOthelloAppModel = (othelloApp) => {
        const blockModels =  [];
        for(let i = 0; i < 8; i++) {
            blockModels[i] = [];
            for(let j = 0; j < 8; j++) {
                blockModels[i][j] = new OthelloBlockModel(othelloApp.othelloBoardModel.blockModels[i][j].status); 
            }
        }
        const updatedOthelloAppModel =  new OthelloAppModel(
                                                new PlayerModel(othelloApp.player1.name, othelloApp.player1.color),
                                                new PlayerModel(othelloApp.player2.name, othelloApp.player2.color),
                                                othelloApp.currentPlayer,
                                                new OthelloBoardModel(blockModels, othelloApp.othelloBoardModel.leftEmptyBlocks))
        return updatedOthelloAppModel;
    }

    initialOthelloAppModel = () => {
        this.initialize(new PlayerModel("player1", "black"), new PlayerModel("player2", "white"));
    }

    checkIsEnd = () => {
        if (!this.othelloBoardModel.isEnd(this))
            return;
        if (!window.confirm(this.othelloBoardModel.determineWinner(this) + "が勝ちました。もう一度プレイしますか？\n")) {
            window.close();
        } 
        this.initialOthelloAppModel();
    }

    goingToEnd = () => {
        this.player1 = new PlayerModel("player1", "black");
        this.player2 = new PlayerModel("player2", "white");
        this.currentPlayer = this.player1;

        const blockModels = [];
        for(let i = 0; i < 8; i++) {
            blockModels[i] = [];
            for(let j = 0; j < 8; j++) {
                blockModels[i][j] = new OthelloBlockModel("white"); 
            }
        }
        blockModels[0][0].setBlack();
        blockModels[7][7].setEmpty();
        this.othelloBoardModel = new OthelloBoardModel(blockModels, 1);
    }
}