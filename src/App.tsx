// import React, { useRef, useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import { useSpring, animated } from '@react-spring/three';
// import './Apps.scss';
// import store from './store';

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import ProjectsListUI from "./components/ProjectsList/ProjectsListUI";
import { SceneManager } from "./components/subComponents/SceneManager/SceneManager";
import { useDeviceType } from "./hooks/useDeviceType";
import { Provider } from "react-redux";
import store from './store';
import { RedirectWithParam } from "./utils/redirectWithParam";
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import redirections from "./data/redirections.json";
import SkillsListUI from "./components/SkillsList/SkillsListUI";
import * as THREE from "three";
import Navigat from "./components/subComponents/Navigator/Navigator";
// import { Test } from './components/Test';

function Home() {
  const [sceneIndex, setSceneIndex] = useState(0); // 0: Presentation, 1: ProjectsList, 2: SkillsList
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const data = params.get('data');

  //Projects2 States
  const [focusIndex, setFocusIndex] = useState<number>(0);

  //Project3 States
  const device = useDeviceType();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [organizedView, setOrganizedView] = useState<boolean>(false);
  const [radius, setRadius] = useState(device === 'desktop' ? 1.5 : 1);
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

  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>

      <Navigat sceneIndex={sceneIndex} setSceneIndex={setSceneIndex} />

      <Canvas shadows dpr={[1, 1.5]}>
        <SceneManager
          activeScene={sceneIndex}
          device={device}
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
          organizedView={organizedView}
          radius={radius}
          speed={speed}
          setFocusIndex={setFocusIndex}
        />
      </Canvas>

      {
        sceneIndex === 1 &&
        <ProjectsListUI focusIndex={focusIndex} />
      }

      {
        sceneIndex === 2 &&
        <SkillsListUI device={device} setOrganizedView={setOrganizedView} radius={radius} setRadius={setRadius} speed={speed} setSpeed={setSpeed} parameterIsOpen={parameterIsOpen} setParameterIsOpen={setParameterIsOpen} />
      }

      {/* <Presentation enterprise={data} />
      <Draw />
      <Skills />
      <PresentationText />
      <Projects />
      <Contact contactTarget={contactTarget} />
      <Footer /> */}

      {/* <Networks scrollToTarget={scrollToTarget} /> */}
    </div>
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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}