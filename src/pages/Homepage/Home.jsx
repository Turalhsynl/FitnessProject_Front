import React from "react";
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Plan from "./components/Plan"
import Coaches from "./components/Coaches"
 
const Home = () => {
  return (
    <div className="">
      <Hero/>
      <About/>
      <Coaches/>
      <Plan/>
    </div>
  );
};

export default Home;
