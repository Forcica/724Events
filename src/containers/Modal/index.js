import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react"; // Ajout useRef et useEffect
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
   const [isOpened, setIsOpened] = useState(opened);
   const modalRef = useRef(null); // Ajout pour la fonction handleClickOutside

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
         setIsOpened(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []); // Ajout du useEffect et gestion quand on clique en dehors de la modal alors fermeture de celle ci

   return (
      <>
         {children({ isOpened, setIsOpened })}
         {isOpened && (
         <div className="modal">
            <div className="content" ref={modalRef}>
               {Content}
               <button
               type="button"
               data-testid="close-modal"
               onClick={() => setIsOpened(false)}
               >
               <Icon name="close" />
               </button>
            </div>
         </div>
         )}
      </>
   );
};

Modal.defaultProps = {
   opened: false,
}

Modal.propTypes = {
   opened: PropTypes.bool,
   Content: PropTypes.node.isRequired,
   children: PropTypes.func.isRequired,
}

export default Modal;