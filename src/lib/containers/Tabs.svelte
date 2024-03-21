<script lang="ts">
  import TabAdder from './TabAdder.svelte';
  import SingleTab from './SingleTab.svelte';
  import type { ComponentType } from 'svelte';

  type Items = {
    Snapshot1: Content;
  };

  type Content = {
    value: number;
    component: ComponentType;
  };

  let items: Items = {
    Snapshot1: {
      value: 1,
      component: SingleTab,
    },
  };
</script>

<TabAdder {items} />
