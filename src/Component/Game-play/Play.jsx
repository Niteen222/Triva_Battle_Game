import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Game-play/Play.css";
import varses from "../image/versus.png";

const GamePlay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { player1, player2 } = location.state || { player1: "Player 1", player2: "Player 2" };

    // Reset the game state when the component mounts
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isLocked, setIsLocked] = useState(false); // Lock answers when the game ends

    const points = {
        easy: 10,
        medium: 15,
        hard: 20,
    };

    // Fetch new questions when the game starts or restarts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const easyQuestions = await fetch('https://the-trivia-api.com/api/questions?difficulty=easy&limit=2');
                const mediumQuestions = await fetch('https://the-trivia-api.com/api/questions?difficulty=medium&limit=2');
                const hardQuestions = await fetch('https://the-trivia-api.com/api/questions?difficulty=hard&limit=2');

                const easyData = await easyQuestions.json();
                const mediumData = await mediumQuestions.json();
                const hardData = await hardQuestions.json();

                const combinedQuestions = [...easyData, ...mediumData, ...hardData];
                setQuestions(combinedQuestions);
                localStorage.setItem("questions", JSON.stringify(combinedQuestions));
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Save the current state (optional if you want to preserve the game if refreshed)
    useEffect(() => {
        localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
        localStorage.setItem("score", JSON.stringify(score));
    }, [currentQuestion, score]);

    // Handle answer click
    const handleAnswerClick = (answer) => {
        if (isLocked) return; // Prevent answering if locked

        const correctAnswer = questions[currentQuestion]?.correctAnswer;
        const isCorrect = answer === correctAnswer;

        let pointsEarned = 0;
        const difficulty = currentQuestion < 2 ? 'easy' : currentQuestion < 4 ? 'medium' : 'hard';

        if (isCorrect) {
            pointsEarned = points[difficulty];
            setScore((prev) => ({
                ...prev,
                [currentQuestion % 2 === 0 ? "player1" : "player2"]: prev[currentQuestion % 2 === 0 ? "player1" : "player2"] + pointsEarned,
            }));
            alert(`Correct Answer! ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} question: ${pointsEarned} points`);
        } else {
            alert("Wrong Answer!");
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setIsGameFinished(true);
                setIsLocked(true); // Lock answers when game is finished
            }
        }, 1000);
    };

    // Navigate to the winner component and reset the game state
    const handleShowWinner = () => {
        // Clear the stored game data
        localStorage.removeItem("questions");
        localStorage.removeItem("currentQuestion");
        localStorage.removeItem("score");

        // Navigate to the winner screen
        navigate("/winner", { state: { player1, player2, score } });
    };

    return (
        <div className="play">
            <div className="question-section">
                <div className="varsus">
                    <h3>{player1}</h3>
                    <img src={varses} alt="Versus" />
                    <h3>{player2}</h3>
                </div>
                <div className="category-game">
                    <select name="" className="select">
                        <option value="">Select Category for Game</option>
                        <option value="">General Knowledge</option>
                        <option value="">History</option>
                        <option value="">Science</option>
                        <option value="">Geography</option>
                    </select>
                </div>
                <div className="quiz-section">
                    <div className="question-sections">
                        <div className="turn">
                            <h3>Turn: {currentQuestion % 2 === 0 ? player1 : player2}</h3>
                            <h4>Level: {currentQuestion < 2 ? "Easy" : currentQuestion < 4 ? "Medium" : "Hard"}</h4>
                        </div>
                        <div className="question">
                            <h2>{questions[currentQuestion] ? questions[currentQuestion].question : "Loading..."}</h2>
                        </div>
                        <div className="answer-first">
                            {questions[currentQuestion] && [...questions[currentQuestion].incorrectAnswers, questions[currentQuestion].correctAnswer].map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer)}
                                    disabled={isLocked}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className="next-question">
                        <button onClick={() => navigate("/")}>Exit Game</button>
                        {isGameFinished && (
                            <button onClick={handleShowWinner}>Show Winner</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePlay;
