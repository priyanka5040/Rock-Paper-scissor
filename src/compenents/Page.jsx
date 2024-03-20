import { useEffect } from "react";
import LandingPage from './LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from './GamePage';
import { useDispatch } from 'react-redux';
import { setPlayerList } from '../redux/playerList';

const Page = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        setInterval(() => {
            dispatch(setPlayerList(localStorage.playerList ? JSON.parse(localStorage.playerList) : []));
        }, [1000]);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            console.log('hello');
            dispatch(setPlayerList(localStorage.playerList ? JSON.parse(localStorage.playerList) : []));
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

  return <BrowserRouter>
    <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="game-page" element={<GamePage />} />
    </Routes>
    </BrowserRouter>;

}
export default Page;