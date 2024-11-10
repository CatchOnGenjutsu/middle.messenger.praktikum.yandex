import { expect } from "chai";
import Router from "./Router.ts";
import Block from "./Block.ts";

class MockBlock extends Block {
  constructor(props: any = {}) {
    super(props);
  }

  getContent(): HTMLElement {
    const div = document.createElement("div");
    div.innerHTML = "Mock block content";
    return div;
  }

  hide(): void {}

  show(): void {}

  render(): string {
    return "<div>Mock block content</div>";
  }
}

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    router = Router.getInstance("root");
  });

  afterEach(() => {
    const root = document.getElementById("root");
    if (root) {
      root.remove();
    }
  });

  it("should add a route correctly", () => {
    router.use("/home", MockBlock);
    const route = router["routes"][0];
    expect(route).to.exist;
    expect(route["_pathname"]).to.equal("/home");
  });

  it("should match the correct route", () => {
    router.use("/home", MockBlock);
    const route = router["routes"][0];
    const isMatch = route.match("/home");
    expect(isMatch).to.be.true;
  });

  it("should not match the incorrect route", () => {
    router.use("/home", MockBlock);
    const route = router["routes"][0];
    const isMatch = route.match("/about");
    expect(isMatch).to.be.false;
  });

  it("should navigate correctly to a matched route", () => {
    router.use("/home", MockBlock);
    const route = router["routes"][0];
    router.go("/home");

    expect(route["_block"]).to.exist;
    expect(route["_block"] instanceof MockBlock).to.be.true;
  });

  it("should call middleware correctly", () => {
    const middleware = (pathname: string) => pathname === "/home";
    router.addMiddleware(middleware);
    const isValid = router["_runMiddleware"]("/home");
    expect(isValid).to.be.true;
  });
});
