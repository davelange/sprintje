<script lang="ts">
  import game from '$lib/game';

  let show = true;

  game.on('play', () => (show = false));
</script>

<div class="root" class:hidden={!show}>
  <img class="img-mono" src="img/mono.png" alt="A monocycle" width="40px" />
  <p>
    Oh no! You're lost somewhere in the Netherlands, and you're going the wrong
    way.
  </p>
  <p>
    If you crash, you'll have to use your dutch speaking skills. Are you ready?
  </p>
  <p class="bold">Press &uarr; to jump, and &darr; to duck.</p>
  <button type="button" class="btn" on:click={() => game.play()}> PLAY </button>
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto 8vh;
    width: 90%;
  }
  .img-mono {
    width: 40px;
    margin-bottom: 20px;
  }
  .hidden {
    display: none;
  }
  .btn {
    margin-top: 16px;
    border-radius: 4px;
    font-weight: 700;
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 2px;
    background: #fff;
    border: 1px solid #333;
    filter: drop-shadow(2px 2px 0 black);
  }
  .bold {
    font-weight: 700;
  }

  @media screen and (min-width: 40em) {
    .root {
      align-items: center;
      text-align: center;
      margin: auto;
    }
  }
</style>
