<script lang="ts">
  import { onMount } from 'svelte';
  import game from '$lib/game';
  import { Character, Announcer, Scenery, ObstacleManager } from '$lib/game';
  import { CHAR } from '$lib/game/data/character/data';

  let canvasEl: HTMLCanvasElement;
  let show = false;
  let crash = false;

  onMount(() => {
    game.init({
      canvasEl,
      character: new Character(CHAR),
      announcer: new Announcer(),
      scenery: new Scenery(),
      obstacleManager: new ObstacleManager()
    });
  });
  game.on('play', () => {
    show = true;
  });
  game.on('crash', () => {
    crash = true;

    setTimeout(() => (crash = false), 500);
  });
</script>

<div class="root" style:display={show ? 'flex' : 'none'} class:crash>
  <canvas class="canvas" bind:this={canvasEl} />
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    margin-top: 10vh;
  }
  .canvas {
    max-width: 100%;
    border-radius: 10px;
  }
  @keyframes crash {
    0% {
      rotate: 0;
      translate: 0 0;
      filter: blur(0);
    }
    20% {
      rotate: -2deg;
    }
    50% {
      translatey: 0 -10%;
      filter: blur(3px);
    }
    80% {
      rotate: 2deg;
    }
    100% {
      rotate: 0;
      translatey: 0 0;
      filter: blur(0);
    }
  }
  .crash {
    animation: crash 0.2s linear forwards;
  }

  @media screen and (min-width: 40em) {
    .root {
      order: 2;
      margin-top: 0;
    }
  }
</style>
