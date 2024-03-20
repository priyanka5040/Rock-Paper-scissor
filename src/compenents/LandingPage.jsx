import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPlayer } from '../redux/session';
import '../App.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerList = useSelector((state) => state.playerList.playerList);
    const [playerName, setPlayerName] = useState('');

    const handleGameStart = () => {
        dispatch(setCurrentPlayer({ name: playerName, gamePlaySelection: 'pending', score: 0 }));
        return navigate('/game-page');
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setPlayerName(value);
    }

    return <div className='Container'>
        <div className='Header'>
            <h1>Welocome to Rock Paper Scissor</h1>
        </div>
        <div className='Details'>
            <div className='image'>
                <img src='https://media.istockphoto.com/id/1056840214/vector/rock-paper-scissors-vector-illustration.jpg?s=612x612&w=0&k=20&c=6KEBfon5f9BXXhLiu9JfOk6EHsM193SiWMcqDjN1jqM=' alt='logo' />
            </div>
            <div className='Content'>
                <div className='User-detail'>
                    <h2>Please enter your name to enter the game </h2>
                    <input
                        type='text'
                        placeholder='Enter your name'
                        onChange={handleChange}
                        value={playerName}
                    />
                </div>
                <h2>Joined Players Details</h2>
                <div className='players'>
                    <div className='players-content'>
                        {(playerList ?? [])?.map((player, index) => <div className='player-name' key={`player-${index}`}>
                            {`${index+1}. ${player.name}`}
                        </div>)}
                    </div>
                </div>
                <div className='button-container'>
                    <button disabled = {!playerName} onClick={handleGameStart}>Start</button>
                </div>
            </div>
        </div>
    </div>
}
export default LandingPage;