import {
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherWindyCloudy,
} from "react-icons/ti";

export const CityWeather = ({ city_name = "Jaghori" }) => {
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-gradient-to-br from-teal-700 via-slate-800 to-sky-900 text-white p-6 rounded shadow-2xl mx-auto max-w-xl">
      {/* ================= TODAY WEATHER ================= */}
      <div className="grid grid-cols-3 items-center mb-6">
        {/* City & Date */}
        <div>
          <h1 className="text-xl font-semibold tracking-wide">{city_name}</h1>
          <p className="text-sm text-white/60">{formattedDate}</p>
        </div>

        {/* Weather Icon */}
        <TiWeatherSunny
          size={64}
          className="mx-auto text-amber-300 drop-shadow-lg"
        />

        {/* Temperature */}
        <div className="text-right">
          <h2 className="text-4xl font-bold">31°</h2>
          <p className="text-sm text-white/60">Sunny</p>
        </div>
      </div>

      {/* ================= WEEKLY WEATHER ================= */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-6 border border-white/10">
        <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">
          Weekly Forecast
        </h3>

        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          <WeatherDay
            day="Mon"
            icon={<TiWeatherSunny />}
            temp="27°"
            iconColor="text-amber-300"
          />
          <WeatherDay
            day="Tue"
            icon={<TiWeatherPartlySunny />}
            temp="19°"
            iconColor="text-yellow-300"
          />
          <WeatherDay
            day="Wed"
            icon={<TiWeatherDownpour />}
            temp="31°"
            iconColor="text-sky-300"
          />
          <WeatherDay
            day="Thu"
            icon={<TiWeatherCloudy />}
            temp="24°"
            iconColor="text-gray-300"
          />
          <WeatherDay
            day="Fri"
            icon={<TiWeatherWindyCloudy />}
            temp="11°"
            iconColor="text-cyan-300"
          />
          <WeatherDay
            day="Sat"
            icon={<TiWeatherShower />}
            temp="21°"
            iconColor="text-blue-300"
          />
        </div>
      </div>
    </section>
  );
};

/* ================= WEEK DAY CARD ================= */
const WeatherDay = ({ day, icon, temp, iconColor }) => (
  <div className="min-w-[72px] flex flex-col items-center gap-2 text-center bg-white/10 rounded-xl py-3 border border-white/10">
    <span className="text-xs text-white/70">{day}</span>
    <span className={`text-2xl ${iconColor}`}>{icon}</span>
    <span className="text-sm font-semibold">{temp}</span>
  </div>
);
