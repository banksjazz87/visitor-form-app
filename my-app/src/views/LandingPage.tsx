import React from "react";
import Hero from "../components/LandingPage/Hero.tsx";
import "../../src/index.css";
import Form from "../components/LandingPage/Form.tsx";

export default function LandingPage() {
    return (
        <div id="landing-page">
            <Hero />
            <Form />
        </div>
    )
}