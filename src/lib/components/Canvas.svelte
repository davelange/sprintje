<script lang="ts">
  import { onMount } from 'svelte';
  import { game } from '$lib/game';
  import Controls from './Controls.svelte';
  import Challenge from './Challenge.svelte';

  let canvasEl: HTMLCanvasElement;
  let show = false;

  game.subscribe(({ event }) => {
    if (event === 'PLAY') {
      show = true;
    }
  });

  onMount(() => {
    game.init(canvasEl);
  });
</script>

<div class="root" style:display={show ? 'flex' : 'none'}>
  <canvas class="canvas" bind:this={canvasEl} />
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  .canvas {
    max-width: 100%;
    border-radius: 10px;
  }

  @media screen and (min-width: 40em) {
    .root {
      order: 2;
    }
  }
</style>
