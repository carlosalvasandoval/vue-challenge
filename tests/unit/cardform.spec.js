import { shallowMount } from "@vue/test-utils";
import CardForm from "@/components/CardForm.vue";

describe("CardForm.vue", () => {
  it("getExpYears", () => {
    const wrapper = shallowMount(CardForm);
    wrapper.vm.getExpYears();
    expect(wrapper.vm.expYears).toHaveLength(10);
  });
});
