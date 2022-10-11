export class PlayerModel {
    #name;
    #color;

    constructor(name, color) {
        this.#name = name;
        if (!["black", "white"].includes(color))
            throw new Error("invalid status");
        this.#color = color;
    }

    get name() {
        return this.#name;
    }

    get color() {
        return this.#color
    }
}