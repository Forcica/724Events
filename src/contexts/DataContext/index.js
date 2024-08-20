import PropTypes from "prop-types";
import {
createContext,
useCallback,
useContext,
useEffect,
useState,
} from "react";

const DataContext = createContext({});

export const api = {
   loadData: async () => {
      const response = await fetch("/events.json");
      return response.json();
   },
};

// Simplifiction du stockage de données (a fix une erreur d'un test)

export const DataProvider = ({ children }) => {
   const [error, setError] = useState(null);
   const [data, setData] = useState(null);
   const [last, setLast] = useState(null);

   const getData = useCallback(async () => {
      try {
         const result = await api.loadData()
         setData(result);
         setLast(result.events[result.events.length-1]);

         // Gestion de la data pour récupérer l'evenement le plus recent
         const loadedData = await api.loadData(); 

         if (loadedData.result) {
            setData({ result: loadedData.result });
         } else {
            const sortedEvents = loadedData.events.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastEvent = sortedEvents[0]; // Prendre le plus récent
      
            setData({
              ...loadedData,
              last: lastEvent,
            });
         }

         // Jusqu'ici on a la data et le dernier evenement
      } catch (err) {
         setError(err);
      }
   }, []);
   
   useEffect(() => {
      if (data) return;
      getData();
   });

   return (
      <DataContext.Provider
         // eslint-disable-next-line react/jsx-no-constructed-context-values
         value={{
            data,
            last,
            error,
         }}
      >
         {children}
      </DataContext.Provider>
   );
   };

   DataProvider.propTypes = {
   children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;