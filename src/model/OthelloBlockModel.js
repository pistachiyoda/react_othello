
export class OthelloBlockModel {
    #status;

    constructor(status = "") {
        if (status === "")
            this.#status = "empty";
        else
            this.#status = status;
    }

    get status() {
        return this.#status;
    }

    set status(status) {
        this.#status = status;
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