<script>
  import { onMount, onDestroy } from "svelte";

  // // Function to set up the panel
  // async function setUpPanel() {
  //   try {
  //     const [tab] = await chrome.tabs.query({
  //       active: true,
  //       lastFocusedWindow: true,
  //     });

  //     if (tab && tab.id !== undefined) {
  //       chrome.tabs.sendMessage(tab.id, { message: "getRootComponent" });
  //       console.log("tab.id", tab.id);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // // Message listener function
  // function messageListener(message) {
  //   console.log("message: ", message);

  //   if (message.type === "updateRootComponent") {
  //     const rootComponent = message.rootComponent;
  //     if (rootComponent) {
  //       // createAndSaveNewSnapshot(rootComponent);
  //       console.log("hi1");
  //     }
  //   } else if (message.type === "returnRootComponent") {
  //     const rootComponent = message.rootComponent;
  //     console.log("rootComponent - message", message);
  //     if (rootComponent) {
  //       // createAndSaveNewSnapshot(rootComponent);
  //       console.log("hi2");
  //     } else {
  //       // setUnableToGetComponentData(true);
  //       console.log("hi3");
  //     }
  //   } else if (message.type === "returnTempRoot") {
  //     const tempRoot = message.rootComponent;
  //     // set the tempRoot as the current snapshot without saving it
  //     // dispatch({
  //     //   type: 'currentSnapshot/setCurrentSnapshot',
  //     //   payload: {
  //     //     rootComponent: tempRoot,
  //     //   },
  //     // });
  //     console.log("tempRoot", tempRoot);
  //   }
  // }

  // // Set up message listener and panel on mount
  // onMount(() => {
  //   console.log("onMount is runnning");
  //   chrome.runtime.onMessage.addListener(messageListener);
  //   setUpPanel();
  //   // chrome.runtime.onMessage.addListener(messageListener);

  //   // Clean up listener on component destruction
  //   onDestroy(() => {
  //     chrome.runtime.onMessage.removeListener(messageListener);
  //   });
  // });

  //-------------------------------------------------------------------------------------------

  let version = "HI";

  // Sends a message to ContentScriptIsolated, telling it to get the
  // current tab's Svelte version. If our response is null, that means
  // the app on the current tab is not using Svelte
  // async function getSvelteVersion() {
  //   version = "hello";
  //   try {
  //     // Get tab the user is on
  //     const [tab] = await chrome.tabs.query({
  //       active: true,
  //       lastFocusedWindow: true,
  //     });
  //     alert(`tab: ${tab}`);
  //     console.log("tab: ", tab);
  //     // Tabs without webpages on them (like new tabs and the extension page)
  //     // All start like 'chrome://' We obviously can't get any DOM data from
  //     // them, so we'll exit the function here, and display an error message
  //     if (tab.url && tab.url.startsWith("chrome://")) {
  //       // setErrorMessage(
  //       //   "This is a restricted browser page. Svelte DevTools+ cannot access this page."
  //       // );
  //       version =
  //         "This is a restricted browser page. Svelte DevTools+ cannot access this page.";
  //       return;
  //     }

  //     if (tab && tab.id !== undefined) {
  //       chrome.tabs.sendMessage(tab.id, { message: "getSvelteVersion" });
  //       console.log("tab.id for getSvelteVersion", tab.id);
  //     }
  //   } catch (error) {
  //     console.log("error from pop: ", error);
  //   }
  // }

  // onMount(() => {
  //   // console.log('popup is running')
  //   getSvelteVersion();
  // });

  // // Listen for response from ContentScriptIsolated. This is where we
  // // get the current tab's Svelte version, and update Popup's state
  // chrome.runtime.onMessage.addListener(function (message) {
  //   if (message.type === "returnSvelteVersion") {
  //     // If message.svelteVersion is null, the app is not using Svelte
  //     if (message.svelteVersion) {
  //       // setSvelteVersion(message.svelteVersion);
  //       version = message.svelteVersion
  //     }
  //   }
  // });

  //-------------------------------------------------------------------------------------------
</script>

<h1>Hello World 1</h1>
<h2>Version: {version}</h2>