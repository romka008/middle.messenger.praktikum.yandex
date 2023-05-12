import {expect} from "chai";
import Router, {IBlockConstructor} from "./Router";
import sinon from "sinon";

describe("Router class", () => {
    const contentFake = sinon.fake.returns(document.createElement("div"));

    const BlockFake = class {
        getContent = contentFake;
    } as unknown as IBlockConstructor;

    beforeEach(() => {
        window.history.forward = sinon.fake();
        window.history.back = sinon.fake();
    });

    it("should be displayed home page", () => {
        expect(window.location.pathname).to.eq("/");
    });

    it("should call router.go method with right path", () => {
        Router.go("/sign-up");
        expect(window.location.pathname).to.eq("/sign-up");
    });

    it("check 'use' methos should instanse Router", () => {
        Router.use("/sign-up", BlockFake).start();
        expect(window.location.pathname).to.eq("/sign-up");
    });
});
