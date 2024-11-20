import React, { createContext, useState, useEffect, useContext } from "react";

const GamesContext = createContext();

export const useGames = () => {
  return useContext(GamesContext);
};

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      // Reemplaza esta URL con la real para obtener los juegos
      const response = await fetch("https://prod.supersteam.pro/api/games");
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games }}>
      {children}
    </GamesContext.Provider>
  );
};
