<script lang="ts">
  import { game } from '$lib/game';
  import challenge from '$lib/stores/challenge';
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    game.init(canvasEl);
  });

  function handleClick(opt: string) {
    if (opt === $challenge.answer) {
      $challenge.active = false;
      game.revive();
    } else {
      $challenge.failed = true;
    }
  }

  function handleRestart() {
    game.restart();
    $challenge.active = false;
  }
</script>

<section class="wrapper">
  <canvas bind:this={canvasEl} width="1000px" height="386px" />

  {#if $challenge.active}
    <div class="challenge">
      {#if $challenge.failed}
        <p>you failed</p>
        <button on:click={handleRestart}>try again</button>
      {:else}
        <p>What does {$challenge.word} mean?</p>

        {#each $challenge.opts as option, i}
          <button on:click={() => handleClick(option)}>
            {option}
            {option === $challenge.answer ? 'X' : ''}
          </button>
        {/each}
      {/if}
    </div>
  {/if}

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
  .challenge {
    position: absolute;
  }
</style>
