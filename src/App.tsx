import './App.css';
import { Html, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import { Routes, useLocation, useNavigate } from "react-router-dom";
import ProjectsListUI from "./components/v2/ProjectsList/ProjectsListUI";
import { SceneManager } from "./components/v2/subComponents/SceneManager/SceneManager";
import SkillsListUI from "./components/v2/SkillsList/SkillsListUI";
import Navigat from "./components/v2/subComponents/Navigator/Navigator";
import { useDeviceType } from "./hooks/useDeviceType";
import { RedirectWithParam } from "./utils/redirectWithParam";
import redirections from "./data/redirections.json";
import Presentation from "./components/v1/Presentation/Presentation";
import Draw from "./components/v1/Draw/Draw";
import Skills from "./components/v1/Skills/Skills";
import PresentationText from "./components/v1/PresentationText/PresentationText";
import Projects from "./components/v1/Projects/Projects";
import Contact from "./components/v1/Contact/Contact";
import Footer from "./components/v1/Footer/Footer";
import Networks from "./components/v1/Networks/Networks";


function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "white" }}>
      <div>Chargement {progress.toFixed(0)}%</div>
    </Html>
  );
}


function Home({ contactTarget, scrollToTarget }: { contactTarget: React.RefObject<HTMLDivElement | null>, scrollToTarget: () => void }) {
  const [WebsiteVersion, setWebsiteVersion] = useState(1);

  const [sceneIndex, setSceneIndex] = useState(0); // 0: Presentation, 1: ProjectsList, 2: SkillsList
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const data = params.get('data');

  //Presentatin States
  const [composerReady, setComposerReady] = useState(false);

  //Projects2 States
  const [focusIndex, setFocusIndex] = useState<number>(0);

  //Project3 States
  const deviceType = useDeviceType();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [organizedView, setOrganizedView] = useState<boolean>(false);
  const [radius, setRadius] = useState(deviceType.device === 'desktop' ? 1.5 : 1);
  const [speed, setSpeed] = useState(0.3);
  const [parameterIsOpen, setParameterIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const allowedDestinations = redirections.map(({ destination }) =>
      destination.replace('/?data=', '')
    );

    if (data && !allowedDestinations.includes(data)) {
      navigate('/', { replace: true });
    } else if (data) {
      const index = allowedDestinations.indexOf(data);
      if (index !== -1) setSceneIndex(index);
    }
  }, [data]);

  const handleVersionToggle = () => {
    setWebsiteVersion(WebsiteVersion === 1 ? 2 : 1);
  };

  return (
    <>
      {
        WebsiteVersion === 2 && (
          <div className="app" style={{ overflow: "hidden", height: "100vh", width: "100vw", scrollbarWidth: "none", visibility: composerReady ? 'visible' : 'hidden' }}>

            <Navigat activeScene={sceneIndex} setSceneIndex={setSceneIndex} setParameterIsOpen={setParameterIsOpen} handleVersionToggle={handleVersionToggle} />

            <Canvas shadows dpr={[1, 1.5]}>
              {!composerReady && <Loader />}
              <SceneManager
                activeScene={sceneIndex}
                deviceType={deviceType}
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
                organizedView={organizedView}
                radius={radius}
                speed={speed}
                setFocusIndex={setFocusIndex}
                onComposerReady={() => setComposerReady(true)}
              />
            </Canvas>

            {

              <ProjectsListUI activeScene={sceneIndex} focusIndex={focusIndex} />
            }

            {
              <SkillsListUI activeScene={sceneIndex} deviceType={deviceType} setOrganizedView={setOrganizedView} radius={radius} setRadius={setRadius} speed={speed} setSpeed={setSpeed} parameterIsOpen={parameterIsOpen} setParameterIsOpen={setParameterIsOpen} />
            }

          </div >
        )
      }

      {
        WebsiteVersion === 1 && (
          <div style={{ overflow: "hidden", backgroundColor: "white" }}>
            {
              deviceType.device === "desktop" &&
              <button className="versionSetter" onClick={handleVersionToggle}>{WebsiteVersion === 1 ? "3D" : "2D"}</button>
            }
            
            <Presentation enterprise={data} />
            <Draw />
            <Skills />
            <PresentationText />
            <Projects />
            <Contact contactTarget={contactTarget} />
            <Footer />
            <Networks scrollToTarget={scrollToTarget} />
          </div>
        )
      }

    </>
  )
}

export function BackgroundColor({ color }: { color: THREE.ColorRepresentation }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(color);
  }, [color]);

  return null;
}


export default function App() {
  const contactTarget = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (contactTarget.current) {
      contactTarget.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            {
              redirections.map(({ source, destination }) => (
                <Route key={source} path={source} element={<RedirectWithParam data={destination} />} />
              ))
            }
            <Route path="/" element={<Home contactTarget={contactTarget ?? null} scrollToTarget={scrollToTarget} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}