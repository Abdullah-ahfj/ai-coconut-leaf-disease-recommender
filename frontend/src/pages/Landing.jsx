import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F0E4] font-['Inter']">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(340px); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .scanline { animation: scanline 3.2s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .scanline, .pulse-ring { animation: none; }
        }
      `}</style>

      <Navbar />

      <main className="flex-grow">

        {/* HERO */}
        <section className="relative bg-[#14332A] text-[#F6F0E4] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#C4622D] mb-6">
                Leaf Diagnostics · MobileNetV2 Transfer Learning
              </span>

              <h1 className="font-['Fraunces'] text-5xl md:text-6xl leading-[1.05] font-semibold mb-6">
                Catch the blight
                <br />
                before it spreads.
              </h1>

              <p className="text-lg text-[#F6F0E4]/75 max-w-md leading-relaxed">
                Photograph a coconut leaf and get an instant diagnosis, powered by a
                fine-tuned CNN — with treatment steps you can act on the same day.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-[#C4622D] text-white px-7 py-3 rounded-md font-medium hover:bg-[#a8511f] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F0E4]"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="border border-[#F6F0E4]/40 text-[#F6F0E4] px-7 py-3 rounded-md font-medium hover:bg-[#F6F0E4]/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F0E4]"
                >
                  Log in
                </Link>
              </div>
            </div>

            {/* Signature visual: scanning frond */}
            <div className="relative flex justify-center">
              <svg viewBox="0 0 400 420" className="w-full max-w-sm" role="img" aria-label="Illustration of a coconut leaf frond being scanned for disease">
                {/* rachis */}
                <line x1="200" y1="20" x2="200" y2="400" stroke="#3D7A5C" strokeWidth="4" />

                {/* leaflets, left side */}
                {[60, 110, 160, 210, 260, 310].map((y, i) => (
                  <ellipse
                    key={`l-${i}`}
                    cx="150"
                    cy={y}
                    rx="55"
                    ry="14"
                    fill={i === 2 ? "#C4622D" : "#3D7A5C"}
                    opacity={i === 2 ? 0.85 : 0.9}
                    transform={`rotate(${-18 - i * 2}, 200, ${y})`}
                  />
                ))}

                {/* leaflets, right side */}
                {[60, 110, 160, 210, 260, 310].map((y, i) => (
                  <ellipse
                    key={`r-${i}`}
                    cx="250"
                    cy={y}
                    rx="55"
                    ry="14"
                    fill={i === 4 ? "#C4622D" : "#3D7A5C"}
                    opacity={i === 4 ? 0.85 : 0.9}
                    transform={`rotate(${18 + i * 2}, 200, ${y})`}
                  />
                ))}

                {/* lesion markers */}
                <g>
                  <circle cx="128" cy="163" r="5" fill="#F6F0E4" />
                  <circle cx="128" cy="163" r="5" fill="#F6F0E4" className="pulse-ring" />
                </g>
                <g>
                  <circle cx="268" cy="263" r="5" fill="#F6F0E4" />
                  <circle cx="268" cy="263" r="5" fill="#F6F0E4" className="pulse-ring" />
                </g>

                {/* scanline */}
                <rect x="60" y="20" width="280" height="6" fill="#F6F0E4" opacity="0.7" className="scanline" />
              </svg>

            </div>

          </div>
        </section>

        {/* PIPELINE */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold text-[#14332A] text-center mb-4">
            From photo to treatment plan
          </h2>
          <p className="text-center text-[#14332A]/60 max-w-xl mx-auto mb-16">
            Three steps, no lab equipment required.
          </p>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-[#3D7A5C]/25" />

            {[
              {
                n: "01",
                title: "Capture",
                body: "Upload a leaf photo or take one live with your device camera — no special lighting needed.",
              },
              {
                n: "02",
                title: "Analyze",
                body: "A fine-tuned MobileNetV2 model scores the image against known disease patterns in seconds.",
              },
              {
                n: "03",
                title: "Treat",
                body: "Get a plain-language diagnosis and a treatment recommendation you can act on right away.",
              },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-xl p-7 shadow-sm border border-[#14332A]/5">
                <span className="font-['Fraunces'] text-sm text-[#C4622D] font-semibold">{step.n}</span>
                <h3 className="font-['Fraunces'] text-xl font-semibold text-[#14332A] mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-[#14332A]/65 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}