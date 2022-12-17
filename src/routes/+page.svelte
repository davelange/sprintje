<script lang="ts">
  import '$lib/styles/app.css';
  import Welcome from '$lib/components/Welcome.svelte';
  import Canvas from '$lib/components/Canvas.svelte';
  import Controls from '$lib/components/Controls.svelte';
  import Challenge from '$lib/components/Challenge.svelte';
</script>

<section class="root">
  <div class="main">
    <Canvas />
    <Controls />
    <Challenge />
  </div>
  <Welcome />
</section>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 20px 8px;
    background: #fafafa;
  }
  .main {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  @media screen and (min-width: 40em) {
    .root {
      justify-content: center;
    }
  }
</style>
