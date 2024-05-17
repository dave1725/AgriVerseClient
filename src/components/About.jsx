import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="about-us">
                <br></br><br></br>
                <div className="mission-vision">
                    <h2>Our Mission</h2>
                    <div className="line1"></div>
                    <p>Here at AgriVerse, we're dedicated to empowering farmers and agricultural enthusiasts with innovative tools and resources to optimize their farming practices and boost productivity. With years of experience in the agriculture industry, our team is committed to revolutionizing the way farming is done, one harvest at a time.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquid aspernatur, laborum fugit in optio inventore cupiditate consectetur quis officia reiciendis, distinctio expedita accusamus eum fuga culpa veniam unde porro!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et corrupti iusto quae sint. Ut, voluptatem consectetur? Corporis unde sed optio aliquid, exercitationem, eum beatae quos non earum accusamus ipsam?</p>

                    <h2>Our Vision</h2>
                    <div className="line1"></div>
                    <p>We envision a future where farming is not just a profession, but a way of life that nurtures communities and sustains the planet. Through continuous innovation and collaboration, we aim to create a world where farmers are empowered to feed the growing population while preserving natural resources and promoting environmental stewardship.</p>
                </div>

                <div className="team">
                    <h2>Meet Our Team</h2>
                    <div className="line1"></div>
                    <div className="team-member">
                        <h3>Richard, CEO & Co-founder</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odit, veniam quaerat ad voluptas odio aperiam autem minima itaque atque possimus sit, alias, aspernatur reiciendis omnis quasi debitis porro sint.</p>
                    </div>
                    <div className="team-member">
                        <h3>Mark Herry, CTO & Co-founder</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum iusto, atque, vel, sint omnis maxime consectetur animi sit eaque accusamus labore fugit obcaecati repudiandae iure quasi inventore temporibus fugiat?</p>
                    </div>
                    <div className="team-member">
                        <h3>Dave, Lead Developer</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quia ipsam dicta quam voluptas, ab repellat, perferendis quos quod ipsa enim, itaque aut autem esse magnam tempora officia earum nobis!</p>
                    </div>
                    <div className="team-member">
                        <h3>Roland Piano, Lead Designer</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit blanditiis recusandae vitae dolorum eveniet aliquid accusamus facilis quisquam similique nesciunt pariatur, veritatis quasi, maxime nulla reprehenderit, at commodi! Voluptatum, ipsa.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AboutUs;
