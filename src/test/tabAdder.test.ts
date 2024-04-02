// import { fireEvent, render} from '@testing-library/svelte';
import resetTab from "../lib/containers/TabAdder.svelte";
import SingleTab from "../lib/containers/SingleTab.svelte";

describe("Reset variables when resetting back to original file, ", () => {
  let items: any;
  let index: number;
  let activeTabValue: number;

  //testcase
  beforeEach(() => {
    items = {
      "Snapshot 1": {
        value: 1,
        component: SingleTab,
      },
      "Snapshot 2": {
        value: 2,
        component: SingleTab,
      },
      "Snapshot 3": {
        value: 3,
        component: SingleTab,
      },
    };
    index = 3;
    activeTabValue = 3;
  });

  test("resets items, index, and activeTabValue to their original values", async () => {
    // Call the resetTab function
    resetTab();

    // Check if items, index, and activeTabValue are reset to their original values
    expect(items).toEqual({
      "Snapshot 1": {
        value: 1,
        component: SingleTab,
      },
    });
    expect(index).toBe(2);
    expect(activeTabValue).toBe(1);
  });
});
