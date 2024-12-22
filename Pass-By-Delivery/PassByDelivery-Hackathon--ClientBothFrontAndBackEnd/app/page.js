"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: "",
    itemDetails: "",
    pickupAddress: "",
    dropAddress: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleNext = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setStep(step + 1);
  };

  const handleSubmit = () => {
    alert("Order submitted successfully!");
    setStep(1); // Reset to Step 1 after submission
    setFormData({
      itemName: "",
      itemDetails: "",
      pickupAddress: "",
      dropAddress: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} />}
        {step === 3 && <Step3 onNext={handleNext} />}
        {step === 4 && <Step4 formData={formData} onSubmit={handleSubmit} />}
      </main>
      <Footer />
    </div>
  );
}