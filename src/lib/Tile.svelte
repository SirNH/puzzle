<script lang="ts">
  // @ts-ignore
  import theGame from './Game.ts'
  
  export let xPosition: string = "0"
  export let yPosition: string = "0"

  var x: bigint = BigInt(+xPosition)
  var y: bigint = BigInt(+yPosition)

  var label: string
  var className: string

  export function updateTile()
  {
    label = theGame.getTileLabel(x, y)
    var empty: boolean = theGame.isEmpty(x, y)
    var clickable: boolean = theGame.canClick(x, y)
    
    if(empty)
    {
      className = "empty"
    }
    else if(!clickable)
    {
      className = "nonClickable"
    }
    else
    {
      className = "clickable"
    }
    //console.log(x + "," + y + "[" + label + "]:" + className)
  }

  function onTileClick()
  {
    theGame.onTileClick(x, y)
  }

  updateTile()
  theGame.installTileUpdatedCallback(x, y, () => updateTile())
</script>

<button class={className} on:click={() => onTileClick()}> {label} </button>

<style>
.clickable
{
  border-style: solid;
  border-color: #e1dbff;
  border-radius: 20%;
  background-color: #6952ce;
  color: #e1dbff;
  text-align: center;
  padding: 26%;
  cursor: pointer;
}
.nonClickable
{
  border-style: solid;
  border-color: #2200b8;
  border-radius: 20%;
  background-color: #2200b8;
  color: #e1dbff;
  text-align: center;
  padding: 26%;
  cursor: not-allowed;
}
.empty
{
  border-radius: 20%;
  background-color: #2200b8;
  color: #e1dbff;
  text-align: center;
  padding: 26%;
  cursor: not-allowed;
  opacity: 0.0;
}
</style>
