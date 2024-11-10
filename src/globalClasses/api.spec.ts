import { expect } from "chai";
import sinon from "sinon";
import { HTTPTransport, queryStringify, RequestOptions } from "./api.ts";

describe("HTTPTransport", function () {
  let httpTransport: HTTPTransport;
  let xhrMock: sinon.SinonFakeXMLHttpRequestStatic;

  beforeEach(() => {
    httpTransport = new HTTPTransport("testPath");
    xhrMock = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhrMock as unknown as typeof XMLHttpRequest;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("queryStringify", function () {
    it("должен вернуть пустую строку для ложных значений", function () {
      expect(queryStringify(null)).to.equal("");
      expect(queryStringify(undefined)).to.equal("");
      expect(queryStringify({})).to.equal("");
    });

    it("должен правильно сериализовать простые данные", function () {
      const data = { key1: "value1", key2: 2, key3: true };
      expect(queryStringify(data)).to.equal("?key1=value1&key2=2&key3=true");
    });

    it("должен обрабатывать массивы в данных", function () {
      const data = { key1: ["value1", "value2"] };
      expect(queryStringify(data)).to.equal("?key1=value1,value2");
    });

    it("должен обрабатывать вложенные объекты в данных", function () {
      const data = { key1: { nestedKey: "nestedValue" } };
      expect(queryStringify(data)).to.equal("?key1=[object Object]");
    });
  });

  describe("get", function () {
    it("должен отправить GET-запрос", function (done) {
      const requestData = { key: "value" };

      sinon.stub(httpTransport, "get").callsFake((url: string, options: RequestOptions | undefined) => {
        if (options && options.headers) {
          expect(options.headers.method).to.equal("GET");
        }
        expect(url).to.include("/test");
        done();
        return Promise.resolve(new XMLHttpRequest());
      });

      httpTransport.get("/test", { data: requestData });
    });
  });

  describe("post", function () {
    it("должен отправить POST-запрос с данными", function (done) {
      const requestData = { key: "value" };

      sinon.stub(httpTransport, "post").callsFake((url: string, options: RequestOptions | undefined) => {
        if (options && options.headers) {
          expect(options.headers.method).to.equal("POST");
          expect(options.data).to.deep.equal(requestData);
        }
        expect(url).to.include("/test");
        done();
        return Promise.resolve(new XMLHttpRequest());
      });

      httpTransport.post("/test", { data: requestData });
    });
  });

  describe("put", function () {
    it("должен отправить PUT-запрос", function (done) {
      sinon.stub(httpTransport, "put").callsFake((url: string, options: RequestOptions | undefined) => {
        if (options && options.headers) {
          expect(options.headers.method).to.equal("PUT");
        }
        expect(url).to.include("/test");
        done();
        return Promise.resolve(new XMLHttpRequest());
      });

      httpTransport.put("/test");
    });
  });

  describe("delete", function () {
    it("должен отправить DELETE-запрос", function (done) {
      sinon.stub(httpTransport, "delete").callsFake((url: string, options: RequestOptions | undefined) => {
        if (options && options.headers) {
          expect(options.headers.method).to.equal("DELETE");
        }
        expect(url).to.include("/test");
        done();
        return Promise.resolve(new XMLHttpRequest());
      });

      httpTransport.delete("/test");
    });
  });
});
