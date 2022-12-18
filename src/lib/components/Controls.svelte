<script lang="ts">
  import { character, game } from '$lib/game';
  import type Game from '$lib/game/game';

  let status: Game['status'] = 'idle';
  let show = false;
  $: showControls = ['running', 'pause'].includes(status);

  game.subscribe(({ event }) => {
    if (event !== 'INIT') show = true;

    status = game.status;
  });

  function togglePlay() {
    if (game.status === 'running') {
      game.pause();
    } else {
      game.play();
    }
  }
</script>

<div class="root" class:hidden={!show}>
  {#if showControls}
    <div class="btn-row" class:disabled={status === 'pause'}>
      <button
        type="button"
        class="btn control"
        on:pointerdown={() => character.jump()}
      >
        &uarr;
      </button>
      <button
        type="button"
        class="btn control"
        on:pointerdown={() => character.crouch()}
      >
        &darr;
      </button>
    </div>
    <button type="button" class="btn ghost" on:click={togglePlay}>
      {status === 'running' ? 'pause' : 'play'}
    </button>
  {/if}
</div>

<style>
  .hidden {
    display: none;
  }
  .root {
    width: 100%;
    margin: 0 auto;
  }
  .btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    margin-bottom: 24px;
  }
  .btn {
    border-radius: 4px;
    font-weight: 700;
    padding: 10px 24px;
    font-size: 18px;
    letter-spacing: 2px;
    background: #fff;
    border: 1px solid #333;
  }
  .control {
    flex: 1 0 auto;
  }
  .disabled {
    opacity: 0.5;
  }
  .ghost {
    border: 0;
    font-size: 16px;
    filter: none;
    width: 100%;
    background: none;
  }

  @media screen and (min-width: 40em) {
    .root {
      display: none;
    }
  }
</style>
