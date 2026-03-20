import { useEffect, useRef } from 'react';
import './ProjetLabel.scss';

interface ProjetLabelProps {
  technos?: string[];
}

function ProjetLabel({ technos = [] }: ProjetLabelProps) {

  const trackRef = useRef<HTMLDivElement>(null);

  const techIcons: Record<string, string> = {
    Bulma: "/icons/technosMini/bulma.png",
    EsLint: "/icons/technosMini/eslint.png",
    Git: "/icons/technosMini/git.png",
    Javascript: "/icons/technosMini/javascript.png",
    Mariadb: "/icons/technosMini/mariadb.png",
    "Node.js": "/icons/technosMini/node.png",
    Phaser: "/icons/technosMini/phaser.png",
    "PostgreSQL": "/icons/technosMini/postgresql.png",
    Prettier: "/icons/technosMini/prettier.png",
    React: "/icons/technosMini/react.png",
    Redux: "/icons/technosMini/redux.png",
    Scrum: "/icons/technosMini/scrum.png",
    SEO: "/icons/technosMini/seo.png",
    Sequelize: "/icons/technosMini/sequelize.png",
    TypeScript: "/icons/technosMini/typescript.png",
    Ubuntu: "/icons/technosMini/ubuntu.png",
    Vue: "/icons/technosMini/vue.png",
    WebSocket: "/icons/technosMini/websocket.png",
    WordPress: "/icons/technosMini/wordpress.png",
    Express: "/icons/technosMini/express.png",
  };

  const duplicated = [...technos, ...technos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || technos.length === 0) return;
    
    const updateSpeed = () => {
      // On récupère la largeur totale réelle (incluant le gap)
      const fullWidth = track.scrollWidth;
      
      // Vitesse de défilement : 50 pixels par seconde
      const speed = 50; 
    
      // Calcul de la durée pour la moitié du ruban (puisqu'on va à -50%)
      // On arrondit à 2 décimales pour la précision du navigateur
      const duration = Math.round(((fullWidth / 2) / speed) * 100) / 100;
    
      if (duration > 0) {
        track.style.setProperty("--duration", `${duration}s`);
      }
    };
  
    // 1. ResizeObserver gère les changements de taille (chargement images, responsive)
    const resizeObserver = new ResizeObserver(() => {
      // On utilise requestAnimationFrame pour synchroniser le calcul avec le rafraîchissement de l'écran
      requestAnimationFrame(updateSpeed);
    });
  
    resizeObserver.observe(track);
  
    // 2. Sécurité : un petit timeout pour forcer le calcul une fois le DOM stable
    const timeoutId = setTimeout(updateSpeed, 100);
  
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [technos]);

  return (
    <div className="technos_scroller">
      <div ref={trackRef} className="technos_track">
        {duplicated.map((tech, i) => (
          <div key={i} className="tech_item">
            <img src={techIcons[tech]} alt={tech} />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjetLabel;

