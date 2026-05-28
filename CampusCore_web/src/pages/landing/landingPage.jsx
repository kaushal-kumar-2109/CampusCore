import React from "react";
import "../../styles/landing/style.css";
import Navbar from "../../components/landing/navBar";
import Hero from "../../components/landing/hero";
import Features from "../../components/landing/features";
import WhyChoose from "../../components/landing/whyChoose";
import Footer from "../../components/landing/footer";
import About from "../../components/landing/about";
import Modules from "../../components/landing/module";

const LandingPage = () => {
    return (<div>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Modules />
        <WhyChoose />
        <Footer />
    </div>);
};

export default LandingPage;