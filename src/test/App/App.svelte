<script lang="ts">
	let message = 'hi';
</script>
<div>{message}</div>
<input id="message" type="text" bind:value={message}><br>
<button on:click={() => message='bye'}>say bye</button>