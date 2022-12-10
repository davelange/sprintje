<script lang="ts">
  import { game } from '$lib';
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
    <button on:click={() => game.restart()}>restart</button>
  </div>
</section>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fafafa;
  }
  canvas {
    width: 1000px;
    max-width: 100vw;
    aspect-ratio: 2.6 / 1;
    margin: auto;
  }
  .controls {
    margin-top: 20px;
  }
</style>
