import {assert, expect} from "chai";

import {HttpError} from "../../src/http-error/HttpError";
import {BadRequestError} from "../../src/http-error/BadRequestError";

describe("using Error subclasses should be possible,", () => {
    describe("HttpError", () => {
        it("should be instance of HttpError and Error", () => {
            const error = new HttpError(418, "Error message");
            expect(error.httpCode).to.equals(418);
            expect(error.message).to.equals("Error message");
            expect(error).to.be.instanceOf(HttpError);
            expect(error).to.be.instanceOf(Error);
        });
    });
    describe("BadRequestError", () => {
        it("should be instance of BadRequestError, HttpError and Error", () => {
            const error = new BadRequestError("Error message");
            expect(error.httpCode).to.equals(400);
            expect(error.message).to.equals("Error message");
            expect(error).to.be.instanceOf(BadRequestError);
            expect(error).to.be.instanceOf(HttpError);
            expect(error).to.be.instanceOf(Error);
        });
    });
    describe("Vanilla Error Subclasses", () => {
        it("should work with Error", function () {
            class Sub extends Error {
                constructor(m: string) {
                    super(m);
                }
            }

            class SubSub extends Sub {
                constructor(m: string) {
                    super(m);
                }
            }

            const e = new Error("e");

            assert(e instanceof Error);
            assert(!(e instanceof Sub));
            assert(!(e instanceof SubSub));

            const s = new Sub("s");

            assert(s instanceof Error);
            assert(s instanceof Sub);
            assert(!(s instanceof SubSub));

            const ss = new SubSub("ss");

            assert(ss instanceof Error);
            assert(ss instanceof Sub);
            assert(ss instanceof SubSub);
        });
    });
    describe("User-defined Error Subclasses", () => {
        it("should be instance of HttpError and Error", () => {
            class Sub extends HttpError {
                constructor(n: number, m: string) {
                    super(n, m);
                }
            }

            class SubSub extends Sub {
                constructor(n: number, m: string) {
                    super(n, m);
                }
            }

            let e = new HttpError(400, "e");

            expect(e.httpCode).to.equals(400);
            expect(e.message).to.equals("e");
            expect(e).to.be.instanceOf(HttpError);
            expect(e).to.be.instanceOf(Error);
            assert(e instanceof Error);
            assert(e instanceof HttpError);
            assert(!(e instanceof Sub));
            assert(!(e instanceof SubSub));

            e = new Sub(401, "s");

            expect(e.httpCode).to.equals(401);
            expect(e.message).to.equals("s");
            expect(e).to.be.instanceOf(HttpError);
            expect(e).to.be.instanceOf(Error);
            assert(e instanceof Error);
            assert(e instanceof HttpError);
            assert(e instanceof Sub);
            assert(!(e instanceof SubSub));

            e = new SubSub(402, "ss");

            expect(e.httpCode).to.equals(402);
            expect(e.message).to.equals("ss");
            expect(e).to.be.instanceOf(HttpError);
            expect(e).to.be.instanceOf(Error);
            assert(e instanceof Error);
            assert(e instanceof HttpError);
            assert(e instanceof Sub);
            assert(e instanceof SubSub);
        });
    });
});
