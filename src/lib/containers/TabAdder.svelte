<script>
    import SingleTab from "./SingleTab.svelte";
          /**
     * @type {any[]}
     */
      export let items = [];
      export let activeTabValue = 1;
      let index = 2;
      const handleClick = (/** @type {number} */ tabValue) => () => (activeTabValue = tabValue);
      const addTab = (/** @type {number} */ tabValue) => () => {items.push({
        label: `Editor ${index}`,
         value: index,
         component: SingleTab,
      });
      activeTabValue = index;
      items = items;
      index++;
    };

    // $:items;
  </script>
  
  
  
  <ul>
      {#each items as item}
          <li class={activeTabValue === item.value ? 'active' : ''}>
              <span on:click={handleClick(item.value)}>{item.label}</span>
          </li>
      {/each}
      <span class="button" on:click={addTab()}>+</span>
  </ul>
  
  {#each items as item}
    {#if activeTabValue == item.value}
    <div class="box">
      <svelte:component this={item.component}/>
    </div>
    {/if}
  {/each}
  
  
  
  <style>
    .box {
      /* margin-bottom: 10px; */
      /* margin-top:5px;  */
      padding: 40px;
      border: solid white;
      border-radius: 0 0 .5rem .5rem;
      border-top: 5px;
      overflow: scroll;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      border-bottom: 1px solid #dee2e6;
    }
    li {
      margin-bottom: -1px;
    }
  
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




    
    li.active > span {
      color: #495057;
      background-color: orange;
      border-color: #dee2e6 #dee2e6 #fff;
    }
  </style>