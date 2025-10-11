import './Navigator.scss'

export default function Navigat({ sceneIndex, setSceneIndex }: { sceneIndex: number; setSceneIndex: (index: number) => void }) {

  const handlePrevious = () => {
    if (sceneIndex > 0)
      setSceneIndex(sceneIndex - 1);
    else
      setSceneIndex(2);

  }

  const handleNext = () => {
    if (sceneIndex < 2)
      setSceneIndex(sceneIndex + 1);
    else
      setSceneIndex(0);
  }

  return (
    <div className="navigat">
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}