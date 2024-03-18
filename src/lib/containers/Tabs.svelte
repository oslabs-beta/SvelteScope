<script lang="ts">
  import TabAdder from './TabAdder.svelte';
  import SingleTab from './SingleTab.svelte';
  // import AnotherTab from './AnotherTab.svelte';

  let items = [{ label: 'Editor 1', value: 1, component: SingleTab }];

  // function addTab(label: string, value: number, content: string) {
  //   items.push({ label, value, component: SingleTab });
  // }

  //   $:items;
</script>

<TabAdder {items} />

<!-- <script>
        import Tab from './Tab.svelte'; // Import the Tab component
    
        /**
       * @type {any[]}
       */
        let tabs = []; // Array to store tab data (title and content)
    
        /**
       * @param {string} title
       * @param {string} content
       */
        function addTab(title, content) {
            tabs.push({ title, content });
        }
    </script> -->

<!-- <div class="tabs">
  <ul class="tab-list">
    {#each items as tab}
      <li class="tab-item" on:click={() => selectTab(tab)}>
        <span>{tab.title}</span>
      </li>
    {/each}
    <button on:click={() => addTab('New Tab', '')}>Add Tab</button>
  </ul>
  <div class="tab-content">
    {#each items as tab}
      <Tab title={tab.label} value={tab.value}component />
    {/each}
  </div>
</div>

<li>
  <span on:click={addTab(2)}>+</span>
</li> -->

<style>
  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.7s;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
    background-color: orangered;
  }
</style>
