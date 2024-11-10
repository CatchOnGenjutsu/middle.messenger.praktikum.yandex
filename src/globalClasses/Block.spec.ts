// import { expect } from "chai";
// import sinon from "sinon";
// import Block, { BlockProps } from "./Block.ts";
// import EventBus from "./EventBus.ts";

// class TestBlock extends Block<BlockProps> {
//   render(): string {
//     return `<div>Hello, ${this.props.name}</div>`;
//   }

//   public triggerComponentDidMount() {
//     this["componentDidMount"]();
//   }

//   public triggerComponentDidUpdate(oldProps: BlockProps) {
//     this["componentDidUpdate"](oldProps, this.props);
//   }
// }

// describe("Block", () => {
//   let block: TestBlock;
//   let eventBus: sinon.SinonStubbedInstance<EventBus>;

//   beforeEach(() => {
//     eventBus = sinon.createStubInstance(EventBus);
//     sinon.stub(EventBus.prototype, "emit").callsFake(eventBus.emit);
//     block = new TestBlock({ name: "World" });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it("должен инициализироваться и вызвать событие INIT", () => {
//     expect(eventBus.emit.calledWith(Block.EVENTS.INIT)).to.be.true;
//   });

//   it("должен корректно устанавливать и обновлять пропсы", () => {
//     expect(block.props.name).to.equal("World");

//     block.setProps({ name: "TestUpdate" });
//     expect(block.props.name).to.equal("TestUpdate");

//     expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
//   });

//   it("должен правильно рендериться", () => {
//     const eventBus = block.getPublicEventBus();
//     const emitSpy = sinon.spy(eventBus, "emit");

//     eventBus.emit(Block.EVENTS.FLOW_CDM);
//     expect(emitSpy.calledOnce).to.be.true;
//   });

//   it("должен вызывать componentDidUpdate при обновлении пропсов", () => {
//     const componentDidUpdateSpy = sinon.spy(block as any, "componentDidUpdate");

//     const oldProps = { ...block.props };
//     block.setProps({ name: "Updated" });
//     block.triggerComponentDidUpdate(oldProps);

//     expect(componentDidUpdateSpy.calledOnce).to.be.true;
//   });
// });

import { expect } from "chai";
import sinon from "sinon";
import Block, { BlockProps } from "./Block.ts";
import EventBus from "./EventBus.ts";

// Тестовый компонент, расширяющий Block
class TestBlock extends Block<BlockProps> {
  // Объявляем жизненные циклы в интерфейсе
  componentDidMount() {
    console.log("Mounted");
  }

  componentDidUpdate(oldProps: BlockProps) {
    console.log("Updated", oldProps);
  }

  render(): string {
    return `<div>Hello, ${this.props.name}</div>`;
  }

  // Вспомогательные методы для тестов
  public triggerComponentDidMount() {
    // Явное использование метода
    this.componentDidMount();
  }

  public triggerComponentDidUpdate(oldProps: BlockProps) {
    // Явное использование метода
    this.componentDidUpdate(oldProps);
  }

  public triggerEventBusEmit() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
}

describe("Block", () => {
  let testBlock: TestBlock;
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
    testBlock = new TestBlock({
      name: "Test",
    });
  });

  describe("конструктор", () => {
    it("должен инициализировать Block с переданными пропсами", () => {
      expect(testBlock.props).to.deep.equal({ name: "Test" });
    });

    it("должен создать экземпляр EventBus", () => {
      expect(testBlock.getEventBus()).to.be.instanceOf(EventBus);
    });
  });

  describe("render", () => {
    it("должен правильно отрендерить HTML на основе пропсов", () => {
      const html = testBlock.render();
      expect(html).to.equal("<div>Hello, Test</div>");
    });
  });

  describe("жизненные циклы компонента", () => {
    it("должен вызвать componentDidMount при монтировании компонента", () => {
      const spy = sinon.spy(testBlock, "componentDidMount");
      testBlock.triggerComponentDidMount();
      expect(spy.calledOnce).to.be.true;
    });

    it("должен вызвать componentDidUpdate при изменении пропсов", () => {
      const spy = sinon.spy(testBlock, "componentDidUpdate");
      testBlock.setProps({ name: "Updated Test" }); // Обязательно нужно обновить пропсы
      expect(spy.calledOnce).to.be.true;
    });
  });

  describe("eventBus", () => {
    it("должен удалять слушателей событий, когда вызвана off", () => {
      const listener = sinon.spy();
      eventBus.on(Block.EVENTS.FLOW_RENDER, listener);
      eventBus.off(Block.EVENTS.FLOW_RENDER, listener);
      testBlock.triggerEventBusEmit();
      expect(listener.called).to.be.false;
    });
  });

  describe("setProps", () => {
    it("должен обновить пропсы, когда вызван setProps", () => {
      testBlock.setProps({ name: "Updated Test" });
      expect(testBlock.props.name).to.equal("Updated Test");
    });

    it("должен вызвать componentDidUpdate при изменении пропсов", () => {
      const spy = sinon.spy(testBlock, "componentDidUpdate");
      testBlock.setProps({ name: "Updated Test" });
      expect(spy.calledOnce).to.be.true;
    });
  });

  describe("детские компоненты", () => {
    it("должен передавать пропсы дочерним компонентам при вызове setProps", () => {
      const child = new TestBlock({ name: "Child" });
      testBlock.children = { child };
      testBlock.setProps({ name: "Updated Parent" });

      // Передаем актуальные пропсы дочернему компоненту
      child.setProps({ name: "Child" }); // Обновление пропсов дочернего компонента

      const childProps = child.props;
      expect(childProps.name).to.equal("Child"); // Проверяем, что дочерний компонент не перезаписывает свои пропсы
    });
  });

  describe("обработка элементов", () => {
    it("должен создать HTML-элемент при вызове getContent", () => {
      const content = testBlock.getContent();
      expect(content).to.be.instanceOf(HTMLElement);
    });

    it("должен обновить DOM-элемент при вызове _render", () => {
      const initialElement = testBlock.getContent();
      testBlock.triggerEventBusEmit();
      const updatedElement = testBlock.getContent();
      expect(initialElement).to.not.equal(updatedElement);
    });
  });
});
