import React from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";

type FormEvent = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type WeatherType = {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    condition: {
      text: string;
    };
    temp_c: number;
    temp_f: number;
    wind_mph: number;
    wind_kph: number;
  };
};

function App() {
  const [location, setLocation] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [weather, setWeather] = React.useState<WeatherType | undefined>(
    undefined
  );
  const [degreesMetric, setDegreesMetric] = React.useState<boolean>(false);
  const [windMetric, setWindMetric] = React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent) => {
    setLocation(e.target.value);
  };

  const toggleDegrees = () => {
    setDegreesMetric(!degreesMetric);
  };

  const toggleWind = () => {
    setWindMetric(!windMetric);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!location) {
      setError("No location provided.");
      setWeather(undefined);
    } else {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "0f85e33055mshb2d116d12997e82p11fcc0jsnd17f3a25ce20",
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.error) {
          setError(result.error.message);
        } else {
          setError("");
          setWeather(result);
        }
      } catch (_error: any) {
        setError(_error);
        setWeather(undefined);
      }
    }
  };

  return (
    <div className="flex flex-col p-8 min-h-screen bg-gradient-to-b from-blue-300 to-white text-slate-800">
      <div className="self-center w-full max-w-80">
        <Form
          {...{
            error,
            degreesMetric,
            handleChange,
            handleSubmit,
            location,
            toggleDegrees,
            toggleWind,
            windMetric,
          }}
        />
        <Weather {...{ degreesMetric, weather, windMetric }} />
      </div>
    </div>
  );
}

export default App;
