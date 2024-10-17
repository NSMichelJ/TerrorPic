import React from "react";

export default function SetionContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section className={`py-20 text-center ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
}
