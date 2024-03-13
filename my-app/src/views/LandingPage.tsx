import React from "react";
import Hero from "../components/LandingPage/Hero.tsx";
import "../assets/styles/index.css";
import Form from "../components/LandingPage/Form.tsx";
import ThankYouMessage from "../components/LandingPage/ThankYouMessage.tsx";

export default function LandingPage() {
    return (
        <div id="landing-page">
            <Hero />
            <Form />
            <ThankYouMessage 
                show={true}
            />
        </div>
    )
}