import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { Counter } from "./Counter";

it("renders correctly", () => {
  const tree = renderer.create(<Counter />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Counter component", () => {
  it("should renders all buttons elements", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.find('[data-test="text"]').html()).toContain(
      "Counter result:"
    );

    const additionButton = wrapper.find('[data-test="add-btn"]');
    expect(additionButton.text()).toBe("+");

    const subtractionButton = wrapper.find('[data-test="sub-btn"]');
    expect(subtractionButton.text()).toBe("-");

    const changeButton = wrapper.find('[data-test="change-btn"]');
    expect(changeButton.text()).toBe("Change");

    const resetButton = wrapper.find('[data-test="reset-btn"]');
    expect(resetButton.text()).toBe("Reset");
  });

  it("should state be 0 when props start is not added", () => {
    const wrapper = shallow(<Counter />);
    const counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");
  });

  it("should state be 10 when props start is added", () => {
    const wrapper = shallow(<Counter start={10} />);
    const counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");
  });

  it("should increment counter from 0 to 1 when default counter is 0", () => {
    const wrapper = shallow(<Counter />);
    const additionButton = wrapper.find('[data-test="add-btn"]');
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    additionButton.simulate("click");
    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("1");

    expect(wrapper.find('[data-test="text"]').html()).toContain(
      "Counter result:"
    );
    expect(wrapper.find('[data-test="counter"]').html()).toContain("1");
  });

  it("should decrement counter from 0 to -1 when default counter is 0", () => {
    const wrapper = shallow(<Counter />);
    const subtractionButton = wrapper.find('[data-test="sub-btn"]');
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    subtractionButton.simulate("click");
    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("-1");
  });

  it("should increment counter from 10 to 13 when props start is 10", () => {
    const wrapper = shallow(<Counter start={10} />);
    const additionButton = wrapper.find('[data-test="add-btn"]');
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    additionButton.simulate("click");
    additionButton.simulate("click");
    additionButton.simulate("click");
    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("13");
  });

  it("should decrement counter from 10 to 7 when props start is 10", () => {
    const wrapper = shallow(<Counter start={10} />);
    const subtractionButton = wrapper.find('[data-test="sub-btn"]');
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    subtractionButton.simulate("click");
    subtractionButton.simulate("click");
    subtractionButton.simulate("click");
    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("7");
  });

  it("should input change a value when number is typed, for example 27", () => {
    const wrapper = shallow(<Counter />);
    const numberInput = wrapper.find('[data-test="input-num"]');
    numberInput.simulate("change", {
      target: { value: "27" },
    });

    expect(wrapper.find("input").get(0).props.value).toEqual("27");
  });

  it("should counter change on submit when the change button is clicked - no props start added", () => {
    const wrapper = shallow(<Counter />);
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    const numberInput = wrapper.find('[data-test="input-num"]');
    numberInput.simulate("change", {
      target: { value: "27" },
    });

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });
    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");
    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("27");
  });

  it("should counter change on submit when change button is clicked - props start added", () => {
    const wrapper = shallow(<Counter start={10} />);
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    const numberInput = wrapper.find('[data-test="input-num"]');
    numberInput.simulate("change", {
      target: { value: "50" },
    });

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("50");
  });

  it("should get initial value 0 when the reset button is clicked - no props start added", () => {
    const wrapper = shallow(<Counter />);
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    const numberInput = wrapper.find('[data-test="input-num"]');
    numberInput.simulate("change", {
      target: { value: "1227" },
    });

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("1227");

    const resetButton = wrapper.find('button[type="reset"]');
    resetButton.simulate("click");

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("0");
  });

  it("should get initial value 10 when the reset button is clicked - props start added", () => {
    const wrapper = shallow(<Counter start={10} />);
    let counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    const numberInput = wrapper.find('[data-test="input-num"]');
    numberInput.simulate("change", {
      target: { value: "300" },
    });

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("click");

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("300");

    const resetButton = wrapper.find('button[type="reset"]');
    resetButton.simulate("click");

    counter = wrapper.find('[data-test="counter"]');
    expect(counter.text()).toBe("10");
  });
});
