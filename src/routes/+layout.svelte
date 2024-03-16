<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount } from 'svelte';

  // Get active tab on initial render:
  onMount(async () => {
    // let the extension know that the panel is closed so it won't send more messages:
    // window.addEventListener('beforeunload', function () {
    //   chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
    // });

    console.log('component mounted!');

    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    // Sends chrome message active tab to contentScript:
    if (tab && tab.id !== undefined) {
      chrome.tabs.sendMessage(
        tab.id,
        { message: 'getRootComponent' },
        (msg: any) => {
          console.log('sent message from main svelte componnet: ', msg);
        }
      );
    }
  });
</script>

<main>
  <SplitpaneContainer />
</main>
