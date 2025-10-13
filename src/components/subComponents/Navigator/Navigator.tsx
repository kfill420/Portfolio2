import './Navigator.scss'

export default function Navigat({ activeScene, setSceneIndex, setParameterIsOpen }: { activeScene: number, setSceneIndex: (index: number) => void, setParameterIsOpen: (isOpen: boolean) => void }) {

  const handleNavigate = (index: number) => {
    if (activeScene === 2) setParameterIsOpen(false);
    setSceneIndex(index);


  }

  return (
    <div className="navigat">
      <button className={`navigat_button ${activeScene === 0 ? 'active' : ''}`} onClick={() => handleNavigate(0)}>Portfolio</button>
      <button className={`navigat_button ${activeScene === 1 ? 'active' : ''}`} onClick={() => handleNavigate(1)}>Projets</button>
      <button className={`navigat_button ${activeScene === 2 ? 'active' : ''}`} onClick={() => handleNavigate(2)}>Compétences</button>
    </div>
  )
}