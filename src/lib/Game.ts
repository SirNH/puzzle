export class Game
{
  private dim: bigint
  private board: Array<bigint>
  private tileCallbacks: Array<() => void | null>

  private emptyTilePosition : [bigint, bigint]

  constructor()
  {
    this.dim = 3n
    this.board = new Array<bigint>
    this.tileCallbacks = new Array<() => void | null>(Number(this.dim * this.dim))
    this.tileCallbacks.fill(null)

    var i: bigint
    for(i = 0n; i < (this.dim * this.dim) - 1n; ++i)
    {
      this.board.push(i + 1n)
    }
    this.board.push(0n)

    i = BigInt(this.board.indexOf(0n))
    this.emptyTilePosition = this.getTilePosition(i)
  }

  private update()
  {
    this.tileCallbacks.forEach(
      (callback) =>
      {
          callback()
      })
  }

  public getNearbyTileIndices() : Array<number>
  {
    var result: Array<number> = new Array<number>

    var emptyX = this.emptyTilePosition[0]
    var emptyY = this.emptyTilePosition[1]

    if(emptyX > 0)
    {
      result.push(this.getTileIndex(emptyX - 1n, emptyY))
    }
    if(emptyX < this.dim - 1n)
    {
      result.push(this.getTileIndex(emptyX + 1n, emptyY))
    }
    if(emptyY > 0)
    {
      result.push(this.getTileIndex(emptyX, emptyY - 1n))
    }
    if(emptyY < this.dim - 1n)
    {
      result.push(this.getTileIndex(emptyX, emptyY + 1n))
    }

    return result
  }

  public shuffleTile()
  {
    var nearbyTiles = this.getNearbyTileIndices();

    var index = BigInt(nearbyTiles[Math.floor(Math.random() * nearbyTiles.length)]);
    var position = this.getTilePosition(index);
    this.onTileClick(position[0], position[1])
  }

  public installTileUpdatedCallback(x: bigint, y: bigint, callback: () => void)
  {
    this.tileCallbacks[this.getTileIndex(x, y)] = callback
  }

  public getTilePosition(index: bigint) : [bigint, bigint]
  {
    var y: bigint = index / this.dim
    var x: bigint = index - (y * this.dim)
    return [x, y]
  }

  public getTileIndex(x: bigint, y: bigint) : number
  {
    return Number((y * this.dim) + x)
  }

  public getTileLabel(x: bigint, y: bigint) : string
  {
    var v: bigint = this.board[this.getTileIndex(x, y)]
    if(v==0n)
    {
      return ""
    }
    return v.toString()
  }

  public onTileClick(x: bigint, y: bigint)
  {
    if(!this.canClick(x,y))
    {
      return
    }

    var tileIndex: number= this.getTileIndex(x, y);
    var emptyIndex: number = this.getTileIndex(this.emptyTilePosition[0], this.emptyTilePosition[1]);

    [this.board[tileIndex], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[tileIndex]]

    this.emptyTilePosition = [x, y]

    this.update()
  }

  public isEmpty(x: bigint, y: bigint) : boolean
  {
    return x == this.emptyTilePosition[0] && y == this.emptyTilePosition[1]
  }

  public canClick(x: bigint, y: bigint) : boolean
  {
    var emptyX: bigint = this.emptyTilePosition[0]
    var emptyY: bigint = this.emptyTilePosition[1]
    if(x == emptyX)
    {
      return y == emptyY - 1n || y == emptyY +1n;
    }
    if(y == emptyY)
    {
      return x == emptyX - 1n || x == emptyX +1n;
    }
    return false
  }
}

const theGame: Game = new Game()

export default theGame