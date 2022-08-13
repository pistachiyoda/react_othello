
export class OthelloBlockModel {
    #status = "empty";

    get status() {
        return this.#status;
    }

    setBlack() {
        this.#status = "black";
    }

    setWhite() {
        this.#status = "white";
    }

    setEmpty() {
        this.#status = "empty";
    }
}