// import {fireEvent, render} from '@testing-library/svelte';

// import App from './App.svelte';

// describe('App', () => {
//   test('message and input have alwayys same values', async () => {
//     const {container, getByText} = render(App);
//     const input = container.querySelector('input');
//     const button = container.querySelector('button');

//     // initial state
//     expect(getByText('hi'));
//     expect(input.value).toBe('hi');

//     // // type in input
//     // await fireEvent.input(input, {target: {value: 'yum yum'}});
//     // expect(getByText('yum yum'));
//     // expect(input.value).toBe('yum yum');
//     // // click button
//     // await fireEvent.click(button);
//     // expect(getByText('bye'));
//     // expect(input.value).toBe('bye');
//   });
// });




import { fireEvent, render} from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
  test('message and input have always the same values', async () => {
    const { container, getByText } = render(App);
    const input = container.querySelector('input');
    const button = container.querySelector('button');

    // Perform null checks before using the variables
    if (input !== null && button !== null) {
      // initial state
      expect(getByText('hi'));
      expect(input.value).toBe('hi');
      // type in input
      await fireEvent.input(input, { target: { value: 'yum yum' } });
      expect(getByText('yum yum'));
      expect(input.value).toBe('yum yum');
      // click button
      await fireEvent.click(button);
      expect(getByText('bye'));
      expect(input.value).toBe('bye');
    } else {
      // Handle case when input or button is not found
      throw new Error('Input or button not found');
    }
  });
});

