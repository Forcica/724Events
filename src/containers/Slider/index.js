import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Créer une copie triée des données pour éviter de modifier le contexte
  const byDateDesc = data?.focus ? [...data.focus].sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  ) : [];

  // Définition de la fonction nextCard avec gestion propre du timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % (byDateDesc.length || 1)); // Ajoute 1 pour éviter la division par zéro
    }, 5000);

    // Fonction de nettoyage pour effacer le timeout
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]); // Ajouter les dépendances nécessaires

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover || '/path/to/default/image.jpg'} alt={event.title || "No title"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title || 'Untitled Event'}</h3>
              <p>{event.description || 'No description available.'}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
               {byDateDesc.map((paginationEvent, radioIdx) => (
                  <input
                     key={`radio-${paginationEvent.id}-${paginationEvent.date}`}  // Clé combinant l'ID et la date
                     type="radio"
                     name="radio-button"
                     checked={index === radioIdx}
                     readOnly
                     onChange={() => setIndex(radioIdx)} // Changer de slide
                  />
               ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
