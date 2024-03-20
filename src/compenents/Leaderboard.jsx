import React from 'react';
import Modal from './Modal';

const Leaderboard = ({ onClose, isOpen, playerList,  }) => {
    console.log(playerList, 'playerList----')
    return <Modal
            onClose={onClose}
            isOpen={true}
            playerList={playerList}
    >
        <div className=''>
            <h1>Leaderboard</h1>
        </div>
        <div className='leaderboard-container'>
            {playerList?.map((player, index) =><div className='leader-player' key={`play-${index}`}>
                {player.name}: {player.score}
            </div>)}
        </div>
    </Modal>
}
export default Leaderboard;