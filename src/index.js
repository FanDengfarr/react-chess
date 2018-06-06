import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}


function caclculateWinner(squares) {
  const lines = [
    [0, 1, 2], [1, 2, 3],
    [4, 5, 6], [5, 6, 7],
    [8, 9, 10], [9, 10, 11],
    [12, 13, 14], [13, 14, 15],
    [0, 5, 10], [5, 10, 15],
    [1, 6, 11], [4, 9, 14],
    [0, 4, 8], [4, 8, 12],
    [1, 5, 9], [5, 9, 13],
    [2, 6, 10], [6, 10, 14],
    [3, 7, 11], [7, 11, 15],
    [3, 6, 9], [6, 9, 12],
    [2, 5, 8], [7, 10, 13] 
  ];
  for (let i=0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  
  renderSquare(i) {
    if(caclculateWinner)
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}          
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(16).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step, 
      xIsNext:(step % 2) ? false : true,
    })
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(caclculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{      
        squares: squares, 
      }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
    });
  }
  
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = caclculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : "Game Start";
      return (
        <li key={move}>
          <a href='#' className={this.state.stepNumber == move ? 'highlightText' : null} onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board  squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
