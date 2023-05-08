import sinon from "sinon";
import HTTPTransport from "./HTTPTransport";
import {expect} from "chai";

describe("HTTPTransport class", () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];

    const XHR = sinon.useFakeXMLHttpRequest();

    //@ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = function (xhr) {
        requests.push(xhr);
    };

    afterEach(() => {
        requests.length = 0;
    });

    it("should call xhr with GET method if get called", () => {
        const transport = new HTTPTransport("/auth");

        transport.get("/user");

        expect(requests[0].method).to.eq("GET");
    });

    it("should call xhr with POST method if get called", () => {
        const transport = new HTTPTransport("/auth");

        transport.post("/login", {a: "a"});

        expect(requests[0].method).to.eq("POST");
    });

    it("should call xhr with PUT method if get called", () => {
        const transport = new HTTPTransport("/");

        transport.put("/", {});

        expect(requests[0].method).to.eq("PUT");
    });
});
