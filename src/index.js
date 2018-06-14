import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 function Square(props){
    return (
      <button className={props.hightLight ? "square highlightText" : "square"} onClick={props.onClick}>
        {props.value}
      </button>);
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
    return {winner: squares[a], line:[a,b,c]};
    }
  }
  return null;
}

class Board extends React.Component {
  
  renderSquare(i) {
       return (<Square  key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} hightLight={this.hightLightChess(i)}/>); 
  }
  
  hightLightChess = (i) => {
    if(this.props.hightLight && (i === this.props.hightLight.line[0] || i === this.props.hightLight.line[1] || i === this.props.hightLight.line[2])){
       return true;
 }
  }
 
  renderRows (){
    let row=[];
    for(let i = 0; i < 4;i++){
      let rows=[];
      for(let j = 0; j <4;j++){
        rows.push(this.renderSquare(i*4+j));
      }
      row.push(<div className="board-row" key={i}>{rows}</div>);
    }
    return row;
  }
  
  render() {
    return (
      <div>
        {this.renderRows()}
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
        lastStep: 'Game Start',
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
    const desc =  squares[i]+'  Move #(' + (Math.floor(i/4)+1)+','+i%4+')';
    this.setState({
        history: history.concat([{      
        squares: squares, 
        lastStep: desc
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
      return (
        <li key={move}>
          <a href='#' className={this.state.stepNumber == move ? 'highlightText' : null} onClick={() => this.jumpTo(move)}>{step.lastStep}</a>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} hightLight={winner}/>
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
