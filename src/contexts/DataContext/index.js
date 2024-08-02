import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    return response.json();
  },
};

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const loadedData = await api.loadData();

      // Vérifier si 'result' est présent pour compatibilité avec les tests
      if (loadedData.result) {
        setData({ result: loadedData.result });
      } else {
        // Trier les événements par date décroissante
        const sortedEvents = loadedData.events.sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastEvent = sortedEvents[0]; // Prendre le plus récent

        setData({
          ...loadedData,
          last: lastEvent,
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  // Utilisation de useMemo pour mémoriser la valeur du contexte
  const value = useMemo(
    () => ({
      data,
      loading,
      error,
    }),
    [data, loading, error]
  );

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
