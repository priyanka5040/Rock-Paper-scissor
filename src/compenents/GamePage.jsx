import React, { useState } from 'react';
import '../App.css';
import { selectionOption } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerList } from '../redux/playerList';
import Leaderboard from './Leaderboard';


const GamePage = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [result, setResult] = useState([]);
    const playerList = useSelector((state) => state.playerList.playerList);
    const currentPlayer = useSelector((state) => state.currentPlayer.currentPlayer);
    console.log(selectedOption, 'selectedOption');

    const updatePlayer = (name, type, value) => {
        let curr = playerList?.find((item) => item?.name === name);
        let listWithoutObject = playerList?.filter((item) => item?.name !== name);
        curr = {
            ...curr,
            [type]: value,
        } 
        dispatch(setPlayerList([ ...listWithoutObject, curr ]));
        localStorage.playerList = JSON.stringify([...listWithoutObject, curr]);
    }

    const getPlayerCurrentScore = (name) => {
        return playerList.find((item) => item.name === name).score + 1
    }
    const updateScore = (scoresObject, name, type, value) => {
        let curr = scoresObject?.find((item) => item?.name === name);
        let listWithoutObject = scoresObject?.filter((item) => item?.name !== name);
        curr = {
            ...curr,
            [type]: value,
        }
        return [ ...listWithoutObject, curr ]; 
    }

    const calculateResult = () => {
        let updatedScores =  [ ...playerList ];

        const newResults = [];
        for (const player1 of playerList) {
          for (const player2 of playerList) {
            if (player1?.name !== player2?.name) {
              const choice1 = player1.gamePlaySelection.toLowerCase();
              const choice2 = player2.gamePlaySelection.toLowerCase();
              let result = "";
              if (choice1 === choice2) continue;
              if (
                (choice1 === "rock" && choice2 === "scissor") ||
                (choice1 === "scissor" && choice2 === "paper") ||
                (choice1 === "paper" && choice2 === "rock")
              ) {
                result = `${player1.name} wins against ${player2.name}!`;
                updatedScores = updateScore(updatedScores, player1.name, 'score', getPlayerCurrentScore(player1.name));
              } else {
                result = `${player2.name} wins against ${player1.name}!`;
                updatedScores = updateScore(updatedScores, player2.name, 'score', getPlayerCurrentScore(player2.name))
              }
              if (!newResults.includes(result)) {
                newResults.push(result);
              }
            }
          }
        }
        dispatch(setPlayerList(updatedScores));
        localStorage.playerList = JSON.stringify(updatedScores);
      
        setResult(newResults);
        setSelectedOption(null);
      };

    const setAnotherTurn = () => {
        updatePlayer(currentPlayer?.name, 'gamePlaySelection', 'pending');
        setResult([]);
        setSelectedOption(null);
    }

    const resetGame = () => {
       const newList = [];
       playerList.map((player) => {
        newList.push({ name: player?.name, gamePlaySelection: 'pending', score: 0 });
       })
       setSelectedOption(null);
       dispatch(setPlayerList(newList));
        localStorage.playerList = JSON.stringify(newList);
        setResult([]);
    }

    return <div className="game-page">
        <div className='left-section'>
            <div className='Header'>
                <div className='leaderboard-btn' style={{marginTop: '50px'}}>
                    <button onClick={resetGame}>
                        Reset Game
                    </button>
                </div>
                <h1>Pick your option</h1>
                <div className='leaderboard-btn' style={{marginTop: '50px'}}>
                    <button onClick={setAnotherTurn}>
                        Next turn
                    </button>
                </div>
                <div className='user-session'>
                    <div>
                        User: {currentPlayer?.name}
                    </div>
                </div>
            </div>
            <div className='selection-container'>
                <div>
                    <div className='selection-content'>
                        {selectionOption?.map((option, index) => <div key={`option-${index}`} className='option' onClick={() => {
                            setSelectedOption(option?.name);
                            updatePlayer(currentPlayer?.name, 'gamePlaySelection', option?.name)

                        }}>
                            <img src={option?.imgUrl} alt={option?.name} style={option?.name === selectedOption ? {border: '2px solid green' } : null}/>
                        </div>)}
                    </div>
                    <div className='button-container'>
                            <button
                                disabled={playerList?.filter((item) => item?.gamePlaySelection === 'pending')?.length}
                                onClick={() => calculateResult()}
                            >
                                Display result
                            </button>
                    </div>
                </div>
                <div className='right-section'>
                    <div className='player-section'>
                        {playerList?.map((player, index) => <div key={`player-${index}`} className='player'>
                            {player.name}
                            <span>
                                {player.gamePlaySelection === 'pending' ? ': Pending' : ': Selected'}
                            </span>
                        </div>)}
                        
                    </div>
                    
                    <div className='leaderboard-btn'>
                        <button onClick={() => setShowLeaderboard(true)}>Leaderboard</button>
                    </div>
                </div>
            </div>
            <div className='results'>
            {result.length > 0 && (
            <div>
            <h2>Results:</h2>
            {result.map((result, index) => (
                <p key={index}>{result}</p>
            ))}
        </div>
      )}
            </div>
        </div>
        {console.log(showLeaderboard)}
        {showLeaderboard
        ? <Leaderboard
            onClose={() => setShowLeaderboard(false)}
            isOpen={true}
            playerList={playerList}
        />
        :null}
    </div>;
};

export default GamePage;