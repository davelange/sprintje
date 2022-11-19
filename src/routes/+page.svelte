<script lang="ts">
  import game from '$lib/game';
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    game.init(canvasEl);
  });
</script>

<canvas bind:this={canvasEl} width="800px" height="600px" />
<button on:click={() => game.play()}>play</button>
<button on:click={() => game.pause()}>pause</button>

<style>
  canvas {
    border: 1px solid black;
  }
</style>
