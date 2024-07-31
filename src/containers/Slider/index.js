import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
   const { data } = useData();
   const [index, setIndex] = useState(0);

   // Vérifier que data et data.focus existent avant de trier
   const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
   ) : [];

   useEffect(() => { // Modification du useEffect en incluant la gestion des index pour mieux gérer les State de l'index de pagination
      if (byDateDesc.length === 0) { // Gestion du cas ou le tableau est vide
         return () => {};  
      }

      const interval = setInterval(() => {  // Utilisation d'un setInterval pour faire une rotation automatique au lieu du setTimeout
         setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); // Gestion de l'incrementation de l'index
      }, 5000); // Intervalle de 5 secondes

      return () => clearInterval(interval); // Gestion de la fermeture de l'intervalle
   }, [byDateDesc.length]); 

   if (!data || !data.focus) { // Gestion du cas ou le tableau est vide
      return <div>Chargement...</div>;   
   }

   return (
      <div className="SlideCardList">
         {byDateDesc.map((event, idx) => (
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
               {byDateDesc.map((radioEvent, radioIdx) => ( // Gestion de l'affichage des boutons de pagination -> de (_, radioIdx) a (radioEvent, radioIdx)
                  <input
                     key={radioEvent.id} // Gestion de l'index des boutons de pagination -> de ${event.id} a ${radioEvent.id}
                     type="radio"
                     name="radio-button"
                     checked={index === radioIdx} // Gestion de l'affichage des boutons de pagination -> de idx === radioIdx a index === radioIdx
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
