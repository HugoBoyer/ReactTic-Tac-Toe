import { useState } from 'react'
import './App.css'

function Square({value,onSquareClick}) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  ) 
}


function App({xisNext, squares, onPlay}) {
  function handleClick(i: number) {
    if(calculateWinner(squares) || squares[i] !== null) {
      return
    }
    const nextSquares = squares.slice() // copie le tableau
    if (xisNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)
    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next Player: " + (xisNext ? "X" : "O")
  }

  return (
    <>
      <div>{status}</div>
      <div className="board-row">   
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xisNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  
  function toMove(nextMove) {
    setCurrentMove(nextMove)
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Aller au coup #" + move
    } else {
      description = "Revenir au debut"
    }
  return (
    <li key={move}>
      <button onClick={() => toMove(move)}>{description}</button>
    </li>
  )
})


  return (
    <div>
      <div>
        <App xisNext={xisNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}


function calculateWinner(squares) {
  const lines = [
    // horizontals
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // verticals
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonals
    [0,4,8],
    [2,4,6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}

