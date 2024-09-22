import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Exit-start/Exit.css";

const Twoplayerinput = () => {
    const navigate = useNavigate();
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [player1Error, setPlayer1Error] = useState('');
    const [player2Error, setPlayer2Error] = useState('');

    const handleStartGame = () => {
        let valid = true;

        // Reset error messages
        setPlayer1Error('');
        setPlayer2Error('');

        if (!player1Name) {
            setPlayer1Error("First player name is required!");
            valid = false;
        }

        if (!player2Name) {
            setPlayer2Error("Second player name is required!");
            valid = false;
        }

        if (valid) {
            // Navigate to the GamePlay component with player names
            navigate("/gameplay", { state: { player1: player1Name, player2: player2Name } });
        }
    };

    const handleExitGame = () => {
        navigate("/"); 
    };

    return (
        <div className="start-exit-sections">
            <div className="start-exit-section">
                <div className="heading-sections">
                    <h1 className="two-headings">Use your names to start the game</h1>
                </div>
                <br />
                <br />
                <section className="two-input-section">
                    <div className="player">
                        <h3>
                            First Player Name <span className="star">*</span>
                        </h3>
                        <input type="text" placeholder="Enter First Player Name *" required
                            onChange={(e) => setPlayer1Name(e.target.value)}/>
                        {player1Error && <p className="error-text">{player1Error}</p>}
                    </div>
                    <div className="player">
                        <h3>
                            Second Player Name <span className="star">*</span>
                        </h3>
                        <input
                            type="text"
                            placeholder="Enter Second Player Name *"
                            required
                            onChange={(e) => setPlayer2Name(e.target.value)}
                        />
                        {player2Error && <p className="error-text">{player2Error}</p>}
                    </div>
                </section>
                <br />
                <hr className="black-hr" />
                <br />
                <div className="btn-section">
                    <button className="exit-game" onClick={handleExitGame}>Exit Game</button>
                    <button className="start-game" onClick={handleStartGame}>Start Game</button>
                </div>
            </div>
        </div>
    );
};

export default Twoplayerinput;
