import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-green-50">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Login
          </h2>

          <form className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
            >
              Login
            </button>

          </form>

        </div>

      </main>

      <Footer />

    </div>
  );
}