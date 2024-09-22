import React from "react";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const handleStartGame = () => {
        navigate("/start"); 
    };

    return (
        <>
            <div className="container">
                <section className="home">
                    <div className="home-content">
                        <div className="heading-sections">
                            <h1 className="two-headings">Show Off Your Quiz Skills!</h1>
                        </div>
                        <br />
                        <p>
                            <b className="Welcome">Welcome to Trivia Challenge!</b> Get ready for an exciting two-player game where your knowledge will be put to the test. Start answering questions to claim victory!
                        </p>
                        <br />
                        <hr className="black-hr"/>
                        <button className="start-btn" onClick={handleStartGame}>Start Game</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
