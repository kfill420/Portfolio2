import './ProjectsList.scss';

interface ProjectsListUIProps {
  focusIndex: number;
}

export default function ProjectsListUI({ focusIndex }: ProjectsListUIProps) {
  const projectDescriptions = [
    "SpieCraft — Site e-commerce de poivres responsive",
    "GitHub Searcher — Recherche avancée GitHub via API",
    "Todolist — Gestion de tâches simple et efficace",
    "CasaLink — Application de gestion d'emploi du temps familial",
    "DTK Shop — Boutique tech sécurisée avec référencement optimisé",
    "Ino Bank — Application mobile de banque en ligne moderne"
  ];

  return (
    <div className="projects2">
      <div className="description-overlay">
        {projectDescriptions[focusIndex]}
      </div>
    </div>

  );
}
