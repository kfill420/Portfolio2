import './SkillsList.scss';

interface SkillsListUIProps {
  position?: [number, number, number];
  device: 'mobile' | 'tablet' | 'desktop';
  setOrganizedView: React.Dispatch<React.SetStateAction<boolean>>;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  parameterIsOpen: boolean;
  setParameterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SkillsListUI({ device, setOrganizedView, radius, setRadius, speed, setSpeed, parameterIsOpen, setParameterIsOpen }: SkillsListUIProps) {

  const showParameter = () => {
    if (device === "mobile" || device === "tablet") {
      if (parameterIsOpen) return true;
      else return false;
    } else {
      return true;
    }
  }

  return (
    <div className="projects3">
      <button className="params_button" onClick={() => setParameterIsOpen((v) => !v)}>
        <img className="params_button_img" src={'/icons/parameter.png'} alt="Bouton d'ouverture des paramètres" />
      </button>

      <div className={showParameter() ? "params params-open" : "params"}>

        <label className="params_organizedView">
          <span className="params_organizedView_label">Vue 3D</span>
          <label className="toggle">
            <input type="checkbox" onChange={() => setOrganizedView((v) => !v)} />
            <span className="slider"></span>
          </label>
        </label>

        <label className="params_radius">
          <span className="params_radius_label">Rayon</span>
          <input
            className="params_radius_slider"
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
          />
          <div className="params_radius_result">
            <span>{radius.toFixed(1)}</span>
          </div>
        </label>

        <label className="params_speed">
          <span className="params_speed_label">Vitesse</span>
          <input
            className="params_speed_slider"
            type="range"
            min="0.05"
            max="10"
            step="0.05"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <div className="params_speed_result">
            <span>{speed.toFixed(2)}</span>
          </div>

        </label>
      </div>
    </div >
  );
}