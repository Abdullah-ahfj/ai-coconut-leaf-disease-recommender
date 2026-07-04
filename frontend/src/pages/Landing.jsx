import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow">

        <section className="bg-green-50">

          <div className="max-w-7xl mx-auto px-6 py-24 text-center">

            <h1 className="text-5xl font-bold text-green-700 mb-6">
              AI-Powered Coconut Leaf Disease Detection
            </h1>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detect coconut leaf diseases using deep learning,
              MobileNetV2 transfer learning, fine-tuning,
              and intelligent treatment recommendations.
            </p>

            <div className="mt-10 flex justify-center gap-4">

              <Link
                to="/register"
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100"
              >
                Login
              </Link>

            </div>

          </div>

        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">

          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Disease Detection
              </h3>

              <p className="text-gray-600">
                Upload a coconut leaf image and receive
                instant disease predictions.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Camera Capture
              </h3>

              <p className="text-gray-600">
                Capture a photo directly using your device camera.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Recommendations
              </h3>

              <p className="text-gray-600">
                Receive treatment and plantation health recommendations.
              </p>
            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}