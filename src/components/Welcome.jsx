import React from 'react';
import WelcomeCards from './WelcomeCards';
import Navbar from './Navbar';
import Footer from "./Footer";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import farmer from "../assets/farmer.png";

const Welcome = () => {
    const navigate = useNavigate();

    const handleGoToFarm = () => {
        const status = localStorage.getItem("status");
        if (status === "true") {
            navigate('/dashboard');
        }
        else {
            navigate('/login');
        }
    }
    return (
        <>
            <Navbar type={1} />
            <div className='outer-welcome'>
                <div className='welcome-container'>
                    <div className='intro-container'>
                        <h1>The Most Reliable way to Manage your Farms!</h1>
                        <p>Create your multiverse of farms now!</p>
                    </div>
                    <div className='go-to-farm'>
                        <button onClick={handleGoToFarm}>
                            <span>Go to farm!</span> <span className='arrow'><FaArrowAltCircleRight /></span>
                        </button><br></br>
                    </div>
                </div>
            </div>
            <WelcomeCards />
            <section id="testimonials">
                <div class="testimonial-heading">
                    <span>See what our clients have to say!</span>
                    <div className='line'></div><br></br><br></br>
                </div>
                <div class="testimonial-box-container">
                    <div class="testimonial-box">
                        <div class="box-top">
                            <div class="profile">
                                <div class="profile-img">
                                    <img src={farmer} />
                                </div>
                                <div class="name-user">
                                    <strong>John mendes</strong>
                                    <span>Iowa, USA</span>
                                </div>
                            </div>
                            <div class="reviews">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        <div class="client-comment">
                            <p>The dashboard feature of this app is a game-changer for me! It provides a comprehensive overview of my farm's performance, from crop yields to financial analytics. It's like having a personal assistant for my farm operations.</p>
                        </div>
                    </div>
                    <div class="testimonial-box">
                        <div class="box-top">
                            <div class="profile">
                                <div class="profile-img">
                                    <img src={farmer} />
                                </div>
                                <div class="name-user">
                                    <strong>Maria Wood</strong>
                                    <span>California, USA</span>
                                </div>
                            </div>
                            <div class="reviews">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="client-comment">
                            <p>Managing my vineyard has never been easier thanks to this app's dashboard. I can monitor soil moisture levels, track vine health, and even schedule tasks for my team—all in one place. It's a lifesaver! The revenue distribution gives a clear-cut idea of revenue over crops</p>
                        </div>
                    </div>
                    <div class="testimonial-box">
                        <div class="box-top">
                            <div class="profile">
                                <div class="profile-img">
                                    <img src={farmer} />
                                </div>
                                <div class="name-user">
                                    <strong>Rajesh Kumar</strong>
                                    <span>Punjab, India</span>
                                </div>
                            </div>
                            <div class="reviews">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        <div class="client-comment">
                            <p>This app's dashboard is incredibly useful for me as a rice farmer. I can analyze market trends, track expenses, and evaluate crop performance effortlessly. It's a must-have tool for any serious farmer. The market section allows me to sell my crop according the recent value</p>
                        </div>
                    </div>
                    <div class="testimonial-box">
                        <div class="box-top">
                            <div class="profile">
                                <div class="profile-img">
                                    <img src={farmer} />
                                </div>
                                <div class="name-user">
                                    <strong>Barry Allen</strong>
                                    <span>Tuscany, Italy</span>
                                </div>
                            </div>
                            <div class="reviews">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        <div class="client-comment">
                            <p>I love how user-friendly the dashboard is in this app. As an olive grower, I rely on it to monitor irrigation schedules, detect pest infestations, and optimize harvesting times. It's an invaluable asset to my farm.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Welcome;