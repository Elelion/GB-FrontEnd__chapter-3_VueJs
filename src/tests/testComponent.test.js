import   'regenerator-runtime/runtime'
import { mount } from "@vue/test-utils";
import TestComponent from "./TestComponent";

describe("TestComponent", () => {
  test("Content of TestComponent", () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        message: "Test Pass!"
      }
    });
    expect(wrapper.text()).toEqual("Message is: Test Pass!");
  });
});
