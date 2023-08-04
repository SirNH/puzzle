<script lang="ts">
  // @ts-ignore
  import theGame from './Game.ts'
  import Tile from './Tile.svelte'

  function doShuffle()
  {
    for(var i:number = 0; i < 1000; ++i)
    {
      theGame.shuffleTile();
    }
  }
</script>

<div class="board" style="width: 200px; height: 200px;">
  <div class="tiles"style="width: 200px; height: 200px;">
    <Tile xPosition=0 yPosition=0/>
    <Tile xPosition=1 yPosition=0/>
    <Tile xPosition=2 yPosition=0/>
    <Tile xPosition=0 yPosition=1/>
    <Tile xPosition=1 yPosition=1/>
    <Tile xPosition=2 yPosition=1/>
    <Tile xPosition=0 yPosition=2/>
    <Tile xPosition=1 yPosition=2/>
    <Tile xPosition=2 yPosition=2/>
  </div>
</div>

<div>
  <br style="line-height:15;" />
</div>

<button class=clickable on:click={() => doShuffle()}>Shuffle</button>


<style>
.board
{
  display: block;
  background-color: #0f0151;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.tiles
{
  display: grid;
  grid-template-columns: 28% 28% 28%;
  grid-template-rows: 28% 28% 28%;
  grid-auto-rows: 2em;
  grid-gap: 3%;
  padding: 5%;
}
.clickable
{
  border-style: solid;
  border-color: #e1dbff;
  background-color: #0f0151;
  color: #e1dbff;
  text-align: center;
  cursor: pointer;
}
</style>
