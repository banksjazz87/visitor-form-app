import React, {useState} from "react";
import Hero from "../components/LandingPage/Hero.tsx";
import "../assets/styles/index.css";
import Form from "../components/LandingPage/Form.tsx";
import ThankYouMessage from "../components/LandingPage/ThankYouMessage.tsx";
import LoadingBar from "../components/Global/LoadingBar.tsx";

export default function LandingPage() {
    const [displayForm, setDisplayForm] = useState<boolean>(true);

    const hideForm = ():void => {
        setDisplayForm(false);
    }

    return (
        <div id="landing-page">
            <Hero 
                show={displayForm}
            />
            <Form 
                show={displayForm}
                showHandler={hideForm}
            />
            <ThankYouMessage 
                show={displayForm ? false : true}
            />

            <LoadingBar />


        </div>
    )
}