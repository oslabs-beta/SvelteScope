<script lang="ts">
  let version;

  // Sends a message to ContentScriptIsolated, telling it to get the
  // current tab's Svelte version. If our response is null, that means
  // the app on the current tab is not using Svelte
  async function getSvelteVersion() {
    try {
      // Get tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      // Tabs without webpages on them (like new tabs and the extension page)
      // All start like 'chrome://' We obviously can't get any DOM data from
      // them, so we'll exit the function here, and display an error message
      if (tab.url && tab.url.startsWith("chrome://")) {
        return;
      }
      chrome.tabs.sendMessage(tab.id, { message: "getSvelteVersion" });
    } catch (error) {
      console.log("error from pop: ", error);
    }
  }

  getSvelteVersion();

  // Listen for response from ContentScriptIsolated. This is where we
  // get the current tab's Svelte version, and update Popup's state
  chrome.runtime.onMessage.addListener(function (message){
    if (message.type === "returnSvelteVersion") {
      if (message.svelteVersion) {
        version = message.svelteVersion;
      }
    }
  });
</script>

<div>

  {#if version}
    <p>This webpage is using <span>Svelte</span> framework.</p>
    <p>Svelte version: <span>{version}</span></p>
  {:else}
    <p>This webpage is <span>NOT</span> using Svelte</p>
    <p>
      <span class="name">Svelte Component Explorer</span> cannot inject this page.
    </p>
  {/if}
</div>
