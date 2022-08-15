// import { EventEmitter } from "../EventEmitter.js";
import { OthelloBoardModel } from "./OthelloBoardModel.js";
export class OthelloAppModel{
    #currentPlayer;
    #player1;
    #player2;
    #othelloBoardModel;

    // ボードはブロックを受け取って、アップはボードを受け取って
    constructor(player1, player2, currentPlayer = null, othelloBoardModel = null) {
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

    // emitChange() {
    //     this.emit("change");
    // }

    // "change"キーワードでemitされる関数を設定する。
    // onChange(listener) {
    //     this.addEventListener("change", listener);
    // }

    switchPlayer() {
        this.#currentPlayer = this.#currentPlayer === this.#player1 ? this.#player2 : this.#player1;
        // this.emitChange();
    }

    handleClick(x, y, othelloApp) {
        if (!this.#othelloBoardModel.isDispachable(x, y, othelloApp))
            return;
        this.#othelloBoardModel.dispachDisc(x, y, othelloApp);
        this.#othelloBoardModel.updateDisc(x, y, othelloApp);
        if (this.#othelloBoardModel.isEnd(othelloApp))
            console.log(this.#othelloBoardModel.determineWinner(othelloApp));
        this.switchPlayer();
        // this.emitChange();
    }

    getPlayerName(othelloApp, color) {
        return othelloApp.player1.color === color ? othelloApp.player1.name : othelloApp.player2.name; 
    }
}