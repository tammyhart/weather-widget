type ToggleProps = {
  id: string;
  left: string;
  right: string;
  toggle: React.ChangeEventHandler<HTMLInputElement>;
  value: boolean;
};

const Toggle = ({ id, left, right, toggle, value }: ToggleProps) => (
  <div className="flex gap-2">
    <p>{left}</p>
    <label
      htmlFor={id}
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        id={id}
        className="peer sr-only"
        checked={value}
        onChange={toggle}
      />
      <div className="h-6 w-11 rounded-full bg-slate-800 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-slate-800"></div>
    </label>
    <p>{right}</p>
  </div>
);

type FormProps = {
  error: string;
  degreesMetric: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  location: string;
  toggleDegrees: React.ChangeEventHandler<HTMLInputElement>;
  toggleWind: React.ChangeEventHandler<HTMLInputElement>;
  windMetric: boolean;
};

const Form = ({
  error,
  degreesMetric,
  handleChange,
  handleSubmit,
  location,
  toggleDegrees,
  toggleWind,
  windMetric,
}: FormProps) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label htmlFor="location">How is the weather in…</label>
    </p>
    <p className="my-2 flex gap-2">
      <input
        id="location"
        type="text"
        onChange={handleChange}
        placeholder="Location"
        value={location}
        className="py-2 px-8 -ml-8 text-xl bg-transparent border border-slate-800 rounded-full w-full"
      />
      <button
        className="p-4 text-xs bg-slate-800 text-blue-300 uppercase font-bold tracking-widest rounded-full"
        type="submit"
      >
        Fetch
      </button>
    </p>
    {error && <p className="text-sm text-red-800">{error}</p>}
    <div className="flex gap-8 mt-4">
      <Toggle
        id="degrees"
        left="F°"
        right="C°"
        value={degreesMetric}
        toggle={toggleDegrees}
      />
      <Toggle
        id="wind"
        left="MPH"
        right="KPH"
        value={windMetric}
        toggle={toggleWind}
      />
    </div>
  </form>
);

export default Form;
