import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCity, FaDatabase, FaMapMarkedAlt } from "react-icons/fa";
import { useCities } from "../../hooks/useCities";

const OnLoadPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const { cities } = useCities();

  // Close popup when data is ready
  useEffect(() => {
    if (cities?.length > 0) {
      setShowPopup(false);
    }
  }, [cities]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* Background */}
      <div
        className="
        absolute inset-0
        bg-slate-950/70
        backdrop-blur-lg
        "
      />

      {/* Popup */}
      <div
        className="
        relative
        w-full
        max-w-lg
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        border border-white/30
        animate-in
        fade-in
        zoom-in
        duration-500
        "
      >
        {/* Header */}
        <div
          className="
          relative
          h-36
          bg-gradient-to-br
          from-sky-500
          via-blue-600
          to-indigo-700
          flex
          items-center
          justify-center
          "
        >
          {/* Close */}
          <button
            onClick={() => setShowPopup(false)}
            className="
            absolute
            right-5
            top-5
            w-10
            h-10
            rounded-full
            bg-white/20
            text-white
            flex
            items-center
            justify-center
            hover:bg-white/30
            transition
            "
          >
            <IoClose size={22} />
          </button>

          {/* Neon Circle */}
          <div
            className="
            relative
            w-24
            h-24
            rounded-full
            bg-white/10
            backdrop-blur
            flex
            items-center
            justify-center
            "
          >
            <div
              className="
              absolute
              inset-0
              rounded-full
              bg-cyan-300/40
              blur-2xl
              animate-pulse
              "
            />

            <FaCity
              size={42}
              className="
              relative
              text-white
              "
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <span
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-sky-50
            text-sky-600
            text-xs
            font-semibold
            uppercase
            tracking-widest
            "
          >
            <FaDatabase />
            Digital City Platform
          </span>

          <h1
            className="
            mt-5
            text-3xl
            font-bold
            text-slate-900
            "
          >
            Loading NEON Project
          </h1>

          <p
            className="
            mt-4
            text-slate-600
            leading-relaxed
            "
          >
            We are preparing your smart city experience. Loading locations,
            projects and city information. Please wait a moment.
          </p>

          {/* Loading Animation */}
          <div className="mt-8">
            <div
              className="
              flex
              justify-center
              items-center
              gap-3
              "
            >
              <span
                className="
                w-3
                h-3
                rounded-full
                bg-sky-500
                animate-bounce
                "
              />

              <span
                className="
                w-3
                h-3
                rounded-full
                bg-blue-600
                animate-bounce
                [animation-delay:200ms]
                "
              />

              <span
                className="
                w-3
                h-3
                rounded-full
                bg-indigo-600
                animate-bounce
                [animation-delay:400ms]
                "
              />
            </div>
          </div>

          {/* Data Cards */}
          <div
            className="
            grid
            grid-cols-2
            gap-4
            mt-8
            "
          >
            <div
              className="
              rounded-xl
              bg-slate-50
              p-4
              "
            >
              <FaMapMarkedAlt className="mx-auto text-sky-600" size={22} />

              <p
                className="
                mt-2
                text-sm
                text-slate-500
                "
              >
                Cities Loaded
              </p>

              <h3
                className="
                text-xl
                font-bold
                text-slate-900
                "
              >
                {cities?.length || 0}
              </h3>
            </div>

            <div
              className="
              rounded-xl
              bg-slate-50
              p-4
              "
            >
              <FaDatabase className="mx-auto text-green-600" size={22} />

              <p
                className="
                mt-2
                text-sm
                text-slate-500
                "
              >
                Status
              </p>

              <h3
                className="
                text-xl
                font-bold
                text-green-600
                "
              >
                Ready
              </h3>
            </div>
          </div>

          {/* Status */}
          <div
            className="
            mt-8
            flex
            justify-center
            items-center
            gap-2
            text-sm
            text-slate-500
            "
          >
            <span
              className="
              w-2.5
              h-2.5
              rounded-full
              bg-green-500
              animate-pulse
              "
            />
            Connecting to NEON services...
          </div>

          {/* Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="
            mt-8
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-sky-600
            to-blue-700
            text-white
            font-semibold
            hover:scale-[1.02]
            transition
            shadow-lg
            shadow-sky-200
            "
          >
            Enter City Platform
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnLoadPopup;
