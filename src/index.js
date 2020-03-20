import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      onClick: props.onClick
    }
  }

    render(){
      if (!this.props.checked){
        return (
          <button className="square" 
                  onClick={() => this.state.onClick()}>
            {this.state.text}
          </button>
        );
      }
      else{
        return (
          <button className="checked-square" 
                  onClick={() => this.state.onClick()}>
            {this.state.text}
          </button>
        );
      }
    }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      squareText: getSquareContent(25)
    };
    this.state.squares[12] = true;
  }

  handleClick(i) {
    if (hasBingo(this.state.squares) || this.state.squares[i]) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[i] = true;
    //this.state.squares = squares;
    this.setState({squares: squares, squareText: this.state.squareText});
    console.log(this.state.squares)
  }

  renderSquare(i) {
    return <Square checked={this.state.squares[i]}
                   text={this.state.squareText[i]}
                   onClick={() => this.handleClick(i)}
           />;
  }

  renderFreeSquare(){
    return <Square checked={true}
                   text={'Ding'}
                   onClick={()=> null}
           />;
  }

  render() {
    console.log('render board')
    let title;
    if (hasBingo(this.state.squares)) {
      title = 'Bingo!';
    }
    else{
      title = 'Conference Call Bingo';
    }

    return (
      <div>
        <div className="status">{title}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderFreeSquare()}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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

function hasBingo(squares) {
  const lines = [
    [ 0,  1,  2,  3,  4],
    [ 5,  6,  7,  8,  9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    
    [ 0,  5, 10, 15, 20],
    [ 1,  6, 11, 16, 21],
    [ 2,  7, 12, 17, 22],
    [ 3,  8, 13, 18, 23],
    [ 4,  9, 14, 19, 24],

    [ 0,  6, 12, 18, 24],
    [ 4,  8, 12, 16, 20]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[b] && squares[c] && squares[d] && squares[e]) {
      return true;
    }
  }
  return null;
}

function getSquareContent(numSquares){
    var options= [
    'Two People Talk At The Same Time',
    '\'Smoke Test\'',
    'Heavy Breathing',
    'Nothing Is Accomplished',
    '\'Can You Repeat That?\'',
    'Argument',
    'Receive A Private Message From Someone Else On The Call',
    '\'I Have To Drop Off\'',
    'Someone Enters Late',
    'Inappropriate Comment',
    '\'Agile\'',
    '\'Low Hanging Fruit\'',
    'Soft Talker',
    'Loud Talker',
    '\'Uhhhhhhhhhhh\'',
    'Pet Noises',
    'Someone Typing Loudly',
    '\'Can You See My Screen?\'',
    'Have A Question For A Person Not There',
    'Meeting Goes Longer Than Scheduled',
    'Kid Making Noise In The Background',
    '\'Can Everyone Hear Me?\'',
    'Meeting Goes Completely Off Topic',
    'Someone Is Eating Or Drinking',
    '\'How Can We User Test This?\'',
    'Someone Only Contributes In The Chat For Some Reason',
    '\'What Decisions Do We Need To Make?\'',
    '\'Let\'s Set Up A Working Session\''
  ]

  let remainingOptions = options.slice();
  let selected = [];

  for (let i=0; i<numSquares; i++){
    if(i!==12){
      let randomNum = (Math.floor(Math.random() * (remainingOptions.length)))
      selected.push(remainingOptions[randomNum])
      remainingOptions = remainingOptions.slice(0,randomNum).concat(remainingOptions.slice(randomNum+1))
    }
    else 
      selected.push('Ding!')
  }

  return selected;
}

