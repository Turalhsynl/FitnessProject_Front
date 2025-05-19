import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "./common/Store";
import Home from "./pages/homepage/Home";
import Header from "../src/pages/homepage/components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/contactpage/Contact";
import Shop from "./pages/shoppage/Shop";
import Cart from "./pages/homepage/components/Cart";
import Classes from "./pages/classespage/Classes";
import Login from "./pages/loginpage/Login";
import Register from "./pages/registerPage/Register";
import ProductDetails from "./pages/homepage/components/ProductDetails";
import SearchBar from "./pages/homepage/components/SearchBar";
import FilterSort from "./pages/shoppage/components/FilterSort";
import UserProfile from "./pages/userProfile/UserProfile"
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Chat from "./pages/homepage/components/Chat";
import FitnessProgram from "./pages/programsPage/FitnessProgram"
import ProgramDetails from "./pages/programsPage/components/ProgramDetail.JSX";
import AboutUs from "./pages/aboutUs/AboutUs";
import CheckoutPage from "./pages/checkout/Checkout";
import SelectCoach from "./pages/membershippage/SelectCoach";
import CoachDetail from "./pages/membershippage/CoachDetail";
import Plans from "./pages/plans/Plans";
import Age from "./pages/plans/Age";
import Gender from "./pages/plans/Gender";
import  Goal  from "./pages/plans/Goal";
import BodyTypeSelector from "./pages/plans/BodyType";
import { WorkoutProvider } from "../src/pages/plans/WorkoutContext";
import SubmitPlan from "./pages/plans/SubmitPlan";
import BodyGoalSelector from "./pages/plans/BodyGoalSelector";
import TargetZones from "./pages/plans/TargetZones";
import Level from "./pages/plans/Level";
import SleepSelection from "./pages/plans/Sleep";
import WorkoutDays from "./pages/plans/WorkoutDays";
import WeightInput from "./pages/plans/WeightInput";
import HeightInput from "./pages/plans/HeightInput";
const App = () => {
  const { accessToken } = useStore(useAuthStore);

  return (
    <Router>
      <Header />
      <WorkoutProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={accessToken ? <Shop /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={accessToken ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/classes" element={accessToken ? <Classes /> : <Navigate to="/login" replace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/programs" element={<FitnessProgram/>}/>
        <Route path="/program-details/:id" element={<ProgramDetails />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/select-coach" element={<SelectCoach />} />
        <Route path="/coach/:id" element={<CoachDetail />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/age" element={<Age />} />
        <Route path="/gender" element={<Gender/>} />
        <Route path="/goal" element={<Goal/>} />
        <Route path="/bodytype" element={<BodyTypeSelector/>} />
        <Route path="/submit-plan" element={<SubmitPlan/>} />
        <Route path="/bodygoal" element={<BodyGoalSelector/>} />
        <Route path="/targetzone" element={<TargetZones/>} />
        <Route path="/level" element={<Level/>} />
        <Route path="/sleep" element={<SleepSelection/>} />
        <Route path="/workoutdays" element={<WorkoutDays/>} />
        <Route path="/weightinput" element={<WeightInput/>} />
        <Route path="/heightinput" element={<HeightInput/>} />
      </Routes>
      </WorkoutProvider>
      <Footer />
    </Router>
  );
};

export default App;
