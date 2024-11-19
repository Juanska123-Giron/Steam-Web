import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GameItemLibrary from "../components/GameItemLibrary";
import { Container } from "../styles/GeneralStyles";
import { GameList } from "../styles/MainMenuStyles";

function Library() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Verificar token de autenticación
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login"); // Redirigir al login si no hay token
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  // Obtener juegos de la biblioteca
  useEffect(() => {
    if (!token) return;

    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://prod.supersteam.pro/api/library/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGames(response.data.games || []); // Asegúrate de que el formato de los datos sea el esperado
      } catch (error) {
        console.error("Error fetching library:", error);
        setError("No se pudieron cargar los juegos. Intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, [token]);

  return (
    <div>
      <Navbar />
      <Container>
        {isLoading && <div>Loading...</div>}{" "}
        {/* Aquí puedes agregar un componente de carga si lo prefieres */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isLoading && !error && (
          <GameList>
            {games.length > 0 ? (
              games.map((game) => (
                <GameItemLibrary
                  key={game.gameId} // Cambié esto para usar gameId
                  imageUri={game.photos ? game.photos[0] : ""}
                  name={game.title}
                  gameId={game.gameId} // Pasando gameId en lugar de _id
                  onPress={() => navigate(`/game/${game.gameId}`)} // Usando gameId para la navegación
                />
              ))
            ) : (
              <p>No games found in the library.</p> // Mensaje si no hay juegos
            )}
          </GameList>
        )}
      </Container>
    </div>
  );
}

export default Library;
