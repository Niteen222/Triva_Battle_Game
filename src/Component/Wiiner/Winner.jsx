import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Wiiner/Winner.css";
import trophy from "../image/trophy-1-.png";

const Winner = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { player1, player2, score } = location.state || {
        player1: "Player 1",
        player2: "Player 2",
        score: { player1: 0, player2: 0 },
    };

    const score1 = score.player1;
    const score2 = score.player2;

    const winner = score1 > score2 ? player1 : score2 > score1 ? player2 : "It's a Tie!";

    return (
        <>
            <div className="winner">
                <div className="winner-section">
                    <div className="award">
                        <img src={trophy} alt="Trophy" />
                        <div className="congratulations-message">
                            <h3>
                                {winner === "It's a Tie!"
                                    ? "It's a Tie!"
                                    : `Congratulations, ${winner}!`}
                            </h3>
                        </div>
                    </div>
                    <div className="player-score-mains">
                        <div className="player-first-score">
                            <h3>{player1}</h3>
                            <h4>{player1} :- {score1}</h4>
                        </div>
                        <div className="player-second-score">
                            <h3>{player2}</h3>
                            <h4>{player2} :- {score2}</h4>
                        </div>
                    </div>
                    <br />
                    {winner === "It's a Tie!" ? (
                        <h4>
                            🎉🎉 It's a tie! Both players performed exceptionally well! 🎉🎉
                        </h4>
                    ) : (
                        <h4>
                            🎉🎉 Congratulations on your quiz game victory! Your quick thinking and knowledge have set you apart. Celebrate your brilliance and enjoy this well-deserved win 🎉🎉
                        </h4>
                    )}
                    <br />
                    <div className="restart-game-btn">
                        <button onClick={() => navigate("/")}>Restart Game</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Winner;
