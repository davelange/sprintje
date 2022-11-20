<script lang="ts">
  import game from '$lib/game';
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    game.init(canvasEl);
  });
</script>

<section class="wrapper">
  <canvas bind:this={canvasEl} width="800px" height="300px" />
  <div class="controls">
    <button on:click={() => game.play()}>play</button>
    <button on:click={() => game.pause()}>pause</button>
  </div>
</section>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  canvas {
    border: 1px solid black;
    width: 800px;
    aspect-ratio: 2.6 / 1;
    margin: auto;
  }
  .controls {
    margin-top: 20px;
  }
</style>
