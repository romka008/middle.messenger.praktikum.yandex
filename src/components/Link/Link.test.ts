import {expect} from "chai";
import {BaseLink} from "./index";
import Router from "../../modules/Router";
import sinon from "sinon";

describe("BaseLink component", () => {
    const callback = sinon.stub();
    // @ts-ignore
    const router = {go: callback} as typeof Router;
    const value = "Войти";
    const route = "/login";

    beforeEach(() => {
        callback.reset();
    });

    it("should render", () => {
        new BaseLink({route, value, router});
    });

    it("should call router.go once after click", () => {
        const link = new BaseLink({route, value, router});

        link.element?.click();

        expect(callback.calledOnce).to.eq(true);
    });

    it("should render value as it passed", () => {
        const link = new BaseLink({route, value, router});

        expect(link.element?.textContent?.trim()).to.eq(value);
    });

    it("should call router.go method after click", () => {
        const link = new BaseLink({route, value, router});

        link.element?.click();

        expect(callback.calledOnceWith(route));
    });
});
