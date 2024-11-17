import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GameItem from "../components/GameItem";
import Tag from "../components/Tag";

function MainMenu() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login"); // Redirigir al login si no hay token
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://prod.supersteam.pro/api/categories/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("No se pudieron cargar las categorías. Intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const categoryQuery = selectedCategory
          ? `?category=${selectedCategory}`
          : "";
        const response = await axios.get(
          `http://localhost:3000/api/games/${categoryQuery}`
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setError("No se pudieron cargar los juegos. Intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [selectedCategory]);

  const toggleCategory = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  if (!token) return null; // Evita renderizar hasta que el token esté validado

  return (
    <div>
      <Navbar />
      <header>
        <h1>Main Menu</h1>
      </header>

      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="categories">
            {categories.map((category) => (
              <Tag
                key={category._id}
                onClick={() => toggleCategory(category._id)}
                isSelected={selectedCategory === category._id}
              >
                {category.category_name}
              </Tag>
            ))}
          </div>
          <div className="games">
            {games.map((game) => (
              <GameItem
                key={game._id}
                imageUri={game.photos[0]}
                name={game.game_name}
                price={`$${Number(game.price).toLocaleString("es-ES")}`}
                game={game}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainMenu;
