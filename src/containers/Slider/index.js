import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
   const { data } = useData();
   const [index, setIndex] = useState(0);

   const byDateDesc = data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // Tri par ordre chronologique décroissant ">" au lieu de "<"
   );

   useEffect(() => { // Modification du useEffect en incluant la gestion des index pour mieux gérer les State de l'index de pagination
      const interval = setInterval(() => { // Utilisation d'un setInterval pour faire une rotation automatique au lieu du setTimeout
         setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); // Logique de changement d'index avec la fonction modulo
      }, 5000); // Changement de l'index toutes les 5 secondes

      return () => clearInterval(interval); // Ajout du clean up de l'interval après chaque utilisation de celle ci pour s'assurer que la mémoire n'est pas saturée d'informations éronées
   }, [byDateDesc.length]); // Changement de l'index toutes les 5 secondes

   return (
      <div className="SlideCardList">
         {byDateDesc?.map((event, idx) => (
         <div key={event.id}>
            <div
               className={`SlideCard SlideCard--${
               index === idx ? "display" : "hide"
               }`}
            >
               <img src={event.cover} alt="forum" />
               <div className="SlideCard__descriptionContainer">
               <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
               </div>
               </div>
            </div>
            <div className="SlideCard__paginationContainer">
               <div className="SlideCard__pagination">
               {byDateDesc.map((radioEvent, radioIdx) => (
                  <input
                     key={radioEvent.id}
                     type="radio"
                     name="radio-button"
                     checked={index === radioIdx}
                     readOnly
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
