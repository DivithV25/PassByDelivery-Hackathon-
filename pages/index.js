"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import AvailabilityForm from "../components/AvailabilityForm";
import TimeSelection from "../components/TimeSelection";
import RouteForm from "../components/RouteForm";
import DeviationForm from "../components/DeviationForm";
import YesNoSelection from "../components/YesNoSelection";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    availability: "",
    startTime: "",
    route: "",
    deviations: 0,
    confirm: "",
  });

  const handleNext = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setStep(step + 1);
  };

  const handleSubmit = () => {
    alert("Data submitted successfully!");
    setStep(1);
    setFormData({
      availability: "",
      startTime: "",
      route: "",
      deviations: 0,
      confirm: "",
    });
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        {step === 1 && <AvailabilityForm onNext={handleNext} />}
        {step === 2 && <TimeSelection onNext={handleNext} />}
        {step === 3 && <RouteForm onNext={handleNext} />}
        {step === 4 && <DeviationForm onNext={handleNext} />}
        {step === 5 && <YesNoSelection formData={formData} onSubmit={handleSubmit} />}
      </main>
    </div>
  );
}