// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js
import {useLocalStorageState} from '../utils'

import * as React from 'react'
function Board({squares, onClick}) {

  function doRenderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {doRenderSquare(0)}
        {doRenderSquare(1)}
        {doRenderSquare(2)}
      </div>
      <div className="board-row">
        {doRenderSquare(3)}
        {doRenderSquare(4)}
        {doRenderSquare(5)}
      </div>
      <div className="board-row">
        {doRenderSquare(6)}
        {doRenderSquare(7)}
        {doRenderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [gameHistory, setGameHistory] = useLocalStorageState('gameState', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useLocalStorageState('gameCurrentStep', 0)
  
  const currentSquares = gameHistory[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  
  function doSelectSquare(square) {
    
    if(winner || currentSquares[square] === 'O' || currentSquares[square] === 'X') return

    const newHistory = gameHistory.splice(0, currentStep + 1)
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    setGameHistory([...newHistory, squaresCopy])
    setCurrentStep(currentStep + 1)
    return
  }

  function doRestart() {
    setGameHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = gameHistory.map( (gameState, i) => (
    <li key={i}><button onClick={() => setCurrentStep(i)} >Step {i} {currentStep === i && ' - current'}</button></li>
  ))
  return (
    <div className="game">
    <div className="game-board">
      <Board onClick={doSelectSquare} squares={currentSquares} />
      <button className="restart" onClick={() => doRestart()}>
        restart
      </button>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
