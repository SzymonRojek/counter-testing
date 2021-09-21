import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { Counter } from "./Counter";

it("renders correctly", () => {
  const tree = renderer.create(<Counter />).toJSON();
  expect(tree).toMatchSnapshot();
});

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });

  return wrapper.find(inputSelector);
};

describe("Counter component", () => {
  it("should renders all buttons elements", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.find("p").html()).toContain("Counter result:");

    const additionButton = wrapper.find(".addition-button");
    expect(additionButton.text()).toBe("+");

    const subtractionButton = wrapper.find(".subtraction-button");
    expect(subtractionButton.text()).toBe("-");

    const changeButton = wrapper.find(".change-button");
    expect(changeButton.text()).toBe("Change");

    const resetButton = wrapper.find(".reset-button");
    expect(resetButton.text()).toBe("Reset");
  });

  it("should state be 0 when props start is not added", () => {
    const wrapper = shallow(<Counter />);
    const counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");
  });

  it("should state be 10 when props start is added", () => {
    const wrapper = shallow(<Counter start={10} />);
    const counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");
  });

  it("should increment counter from 0 to 1 when default counter is 0", () => {
    const wrapper = shallow(<Counter />);
    const additionButton = wrapper.find(".addition-button");
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");
    additionButton.simulate("click");
    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("1");
    expect(wrapper.find("p").html()).toContain("Counter result:");
    expect(wrapper.find("span").html()).toContain("1");
  });

  it("should decrement counter from 0 to -1 when default counter is 0", () => {
    const wrapper = shallow(<Counter />);
    const subtractionButton = wrapper.find(".subtraction-button");
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");
    subtractionButton.simulate("click");
    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("-1");
  });

  it("should increment counter from 10 to 13 when props start is 10", () => {
    const wrapper = shallow(<Counter start={10} />);
    const additionButton = wrapper.find(".addition-button");
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");
    additionButton.simulate("click");
    additionButton.simulate("click");
    additionButton.simulate("click");
    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("13");
  });

  it("should decrement counter from 10 to 7 when props start is 10", () => {
    const wrapper = shallow(<Counter start={10} />);
    const subtractionButton = wrapper.find(".subtraction-button");
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");
    subtractionButton.simulate("click");
    subtractionButton.simulate("click");
    subtractionButton.simulate("click");
    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("7");
  });

  it("should input change a value when number is typed, for example 27", () => {
    const wrapper = shallow(<Counter />);
    expect(
      simulateChangeOnInput(wrapper, ".number-input", "27").props().value
    ).toEqual("27");
  });

  it("should counter change on submit when the change button is clicked - no props start added", () => {
    const wrapper = shallow(<Counter />);
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");

    simulateChangeOnInput(wrapper, ".number-input", "27");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("27");
  });

  it("should counter change on submit when change button is clicked - props start added", () => {
    const wrapper = shallow(<Counter start={10} />);
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");

    simulateChangeOnInput(wrapper, ".number-input", "27");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("27");
  });

  it("should get initial value 0 when the reset button is clicked - no props start added", () => {
    const wrapper = shallow(<Counter />);
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");

    simulateChangeOnInput(wrapper, ".number-input", "1227");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("1227");

    const resetButton = wrapper.find('button[type="reset"]');
    resetButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("0");
  });

  it("should get initial value 10 when the reset button is clicked - props start added", () => {
    const wrapper = shallow(<Counter start={10} />);
    let counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");

    simulateChangeOnInput(wrapper, ".number-input", "300");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("300");

    const resetButton = wrapper.find('button[type="reset"]');
    resetButton.simulate("click");

    counter = wrapper.find(".counter");
    expect(counter.text()).toBe("10");
  });
});
