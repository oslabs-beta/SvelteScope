<script lang="ts">
  import { onMount } from "svelte";

  let version = 'HI';

  // Sends a message to ContentScriptIsolated, telling it to get the
  // current tab's Svelte version. If our response is null, that means
  // the app on the current tab is not using Svelte
  async function getSvelteVersion() {
    version = 'hello'
    try {
      // Get tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      alert(`tab: ${tab}`);
      console.log("tab: ", tab);
      // Tabs without webpages on them (like new tabs and the extension page)
      // All start like 'chrome://' We obviously can't get any DOM data from
      // them, so we'll exit the function here, and display an error message
      if (tab.url && tab.url.startsWith("chrome://")) {
        // setErrorMessage(
        //   "This is a restricted browser page. Svelte DevTools+ cannot access this page."
        // );
        version =
          "This is a restricted browser page. Svelte DevTools+ cannot access this page.";
        return;
      }
      //   chrome.tabs.sendMessage(tab.id!, { message: "getSvelteVersion" });
    } catch (error) {
        console.log('error from pop: ', error)
    }
  }

  onMount(() => {
    console.log('popup is running')
    getSvelteVersion();
  });

  // Listen for response from ContentScriptIsolated. This is where we
  // get the current tab's Svelte version, and update Popup's state
  //   chrome.runtime.onMessage.addListener(function (message) {
  //     if (message.type === 'returnSvelteVersion') {
  //       // If message.svelteVersion is null, the app is not using Svelte
  //       if (message.svelteVersion) setSvelteVersion(message.svelteVersion);
  //     }
  //   });
</script>

<h3>This is popup</h3>

<p>Version: {version}</p>
