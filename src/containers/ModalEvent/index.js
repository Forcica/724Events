import PropTypes from "prop-types";

import "./style.scss";

const ModalEvent = ({ event }) => (
   <div className="ModalEvent">
      <div className="ModalEvent__imageContainer">
         <img
            src={`${process.env.PUBLIC_URL}${event.cover}`}
            alt={event.title}
         />
      </div>
      <div className="ModalEvent__title">
         <div className="ModalEvent__titleLabel">{event.type}</div>
         <h2>{event.title}</h2>
      </div>
      <div className="ModalEvent__descriptionContainer">
         <h3>Description</h3>
         <div>{event.description}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
         <h3>Date</h3>
         <div>{event.periode}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
         <h3>Prestations</h3>
         <div className="ModalEvent__prestationsList">
            {event.prestations.map((presta) => (
               <div key={presta}>{presta}</div>
            ))}
         </div>
      </div>
   </div>
);

ModalEvent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.any.isRequired,
}

export default ModalEvent;
