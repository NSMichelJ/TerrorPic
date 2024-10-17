import React from "react";

interface StepPros {
  label: string;
  icon: React.ReactNode;
  description: string;
  bgColor: string;
  textColor: string;
}

export default function Step({
  label,
  icon,
  description,
  bgColor,
  textColor,
}: StepPros) {
  return (
    <div className="flex flex-col items-center text-center mx-auto">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bgColor}`}
      >
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{label}</h3>
      <p>{description}</p>
    </div>
  );
}
