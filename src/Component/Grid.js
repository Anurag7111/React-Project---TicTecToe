import React, { useState } from 'react';
import './Grid.css';

export default function Grid() {
    const [text, setText] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState('pending');

    const resetAll = () => {
        setWinner('pending');
        setCells(Array(9).fill(''));
    }

    const checkWinner = (square) => {
        let combos = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            virtical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let comb in combos){
            combos[comb].forEach(pattern => {
                if (
                    square[pattern[0]] === '' ||
                    square[pattern[1]] === '' ||
                    square[pattern[2]] === ''
                ){
                    //do nothing (because grid is empty)
                }
                else if (
                    square[pattern[0]] === square[pattern[1]] &&
                    square[pattern[1]] === square[pattern[2]]
                ) {
                    setWinner(square[pattern[0]]);
                }
            });
        }
    }

    const handleClick = (num) => {
        if (winner === 'X' || winner === 'O'){
            return;
        }
        // alert(num);
        if (cells[num] !== ''){
            alert('This is already Clicked')
            return;
        }

        let square = [...cells];

        if (text === 'X'){
            square[num] = 'X';
            setText('O')
        }
        else {
            square[num] = 'O';
            setText('X')
        }
        checkWinner(square);
        setCells(square);
        console.log(square)
    }

    const Cell = ({num}) => {
        return <td onClick={()=>handleClick(num)}>{cells[num]}</td>
    }

    return (
        <div className='content'>
            <h1 className='heading'>Tic Tec Toe</h1>
            <p>Turn: {text}</p>
            <table>
                <tbody>
                    <tr>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                </tbody>
            </table>
            <h3>The Winner Is {winner}.</h3>
            <button onClick={resetAll}>Play Again</button>
        </div>
    )
}