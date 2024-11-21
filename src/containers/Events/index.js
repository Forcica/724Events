import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
   const { data, error } = useData();
   const [type, setType] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   const events = data?.events || [];

   const filteredEvents = !type ? events : events.filter(event => event.type === type); // Utilisation de "filter" pour sélectionner les événements par type si un type est spécifié, sinon tous les événements sont sélectionnés
   // Le filtrage ne faisait aucune distinction en fonction du type auparavant (data?.events était utilisé pour les deux cas)

   const paginatedEvents = filteredEvents.filter((event, index) => // Utilisation de "filter" pour découper correctement la liste des événements en plusieurs pages si besoin, en utilisant les index des événements
      (currentPage - 1) * PER_PAGE <= index && index < currentPage * PER_PAGE
   ); 
   const changeType = (evtType) => {
      setCurrentPage(1);
      setType(evtType);
   };

   const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE); // Utilisation de "Math.ceil" pour garantir que le nombre de pages est bon. math.ceil arrondit toujours à l'entier supérieur alors que math.floor arrondit à l'entier inférieur

   const typeList = new Set(events.map((event) => event.type));

   return (
      <>
         {error && <div>An error occurred</div>}
         {data === null ? (
         "loading"
         ) : (
         <>
            <h3 className="SelectTitle">Catégories</h3>
            <Select
               selection={Array.from(typeList)}
               onChange={(value) => (value !== "Toutes" ? changeType(value) : changeType(null))} // Correction de la logique pour s'assurer que l'option "Toutes" est correctement gérée et n'est pas ajoutée deux fois
            /> 
            <div id="events" className="ListContainer">
               {paginatedEvents.map((event) => (
               <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                     <EventCard
                     onClick={() => setIsOpened(true)}
                     imageSrc={`${process.env.PUBLIC_URL}${event.cover}`}
                     title={event.title}
                     date={new Date(event.date)}
                     label={event.type}
                     />
                  )}
               </Modal>
               ))}
            </div>
            <div className="Pagination">
               {[...Array(pageNumber)].map((_, n) => (
               // eslint-disable-next-line react/no-array-index-key
               <a key={`page-${n}`} href="#events" onClick={() => setCurrentPage(n + 1)}>
                  {n + 1}
               </a>
               ))}
            </div>
         </>
         )}
      </>
   );
};

export default EventList;