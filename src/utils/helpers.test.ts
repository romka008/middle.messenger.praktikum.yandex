import {expect} from "chai";
import {Indexed, set} from "./helpers";

describe("set helper", () => {
    it("should return first param if it is non-object", () => {
        const result = set(null, "", "123") as Indexed;

        expect(result).to.eq(null);
    });

    it('should throw new Error if "path" parameter is not string', () => {
        const notAStringPath = null;

        const result = () => set({}, notAStringPath, "123") as Indexed;

        expect(result).to.throw(Error);
    });

    it("should return the same object as it passed", () => {
        const obj = {a: 1, b: 2};
        const path = "a";
        const value = 3;
        const result = set(obj, path, value) as Indexed;

        expect(result).to.eq(obj);
    });
});
