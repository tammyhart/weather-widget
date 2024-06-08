import { format } from "date-fns";
import { WeatherType } from "../App";

type Location = {
  region: string;
  country: string;
};

const getRegion = ({ region, country }: Location) => {
  return ["Canada", "United States of America", "USA"].includes(country)
    ? region
    : country;
};

type Children = { children: React.ReactNode };

const ListItem = ({ children }: Children) => (
  <li className="my-4">{children}</li>
);

const Title = ({ children }: Children) => (
  <p className="text-5xl">{children}</p>
);

const SubTitle = ({ children }: Children) => (
  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
    {children}
  </p>
);

const DateLine = ({ children }: Children) => (
  <p className="py-1 px-8 -mx-8 text-xs bg-slate-800 text-blue-300 uppercase font-bold tracking-widest rounded-full">
    {children}
  </p>
);

type WeatherProps = {
  degreesMetric: boolean;
  weather?: WeatherType;
  windMetric: boolean;
};

const Weather = ({ degreesMetric, weather, windMetric }: WeatherProps) => (
  <>
    {!!weather && (
      <ul className="mt-8">
        <ListItem>
          <Title>{weather.location.name}</Title>
          <SubTitle>{getRegion(weather.location)}</SubTitle>
        </ListItem>
        <ListItem>
          <DateLine>
            {format(
              new Date(weather.location.localtime),
              "EEEE, LLLL d, yyyy - h:mm a"
            )}
          </DateLine>
        </ListItem>
        <ListItem>
          <Title>
            {degreesMetric ? weather.current.temp_c : weather.current.temp_f}°
          </Title>
          <SubTitle>{degreesMetric ? "Celsius" : "Farenheit"}</SubTitle>
        </ListItem>
        <ListItem>
          <Title>{weather.current.condition.text}</Title>
          <SubTitle>Conditions</SubTitle>
        </ListItem>
        <ListItem>
          <Title>
            {windMetric ? weather.current.wind_kph : weather.current.wind_mph}{" "}
            {windMetric ? "kph" : "mph"}
          </Title>
          <SubTitle>Wind</SubTitle>
        </ListItem>
      </ul>
    )}
  </>
);

export default Weather;
