<script lang="ts">
  import game from '$lib/game';
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    game.init(canvasEl);
  });
</script>

<section class="wrapper">
  <canvas bind:this={canvasEl} width="1000px" height="386px" />
  <div class="controls">
    <button on:click={() => game.play()}>play</button>
    <button on:click={() => game.pause()}>pause</button>
  </div>
</section>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f1f1f1;
  }
  canvas {
    width: 1000px;
    aspect-ratio: 2.6 / 1;
    margin: auto;
  }
  .controls {
    margin-top: 20px;
  }
</style>
