import { Ghost } from "lucide-react";
import Link from "next/link";

export default function Dark404Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient bg-gray-800 text-gray-200">
      <div className="text-center justify-center items-center flex flex-col mb-2">
        <Ghost className="size-36" />
        <h1 className="text-2xl font-bold">TerrorPic</h1>
      </div>
      <h2 className="text-6xl font-bold mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-4">Page Not Found</h3>
      <p className="text-gray-200 text-center mb-8 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
        been moved or deleted.
      </p>
      <Link
        href="/"
        className="inline-flex bg-medium-purple-700 hover:bg-medium-purple-800 text-gray-200 font-bold rounded-lg text-sm px-5 py-2.5"
      >
        Return to Home
      </Link>
    </div>
  );
}
