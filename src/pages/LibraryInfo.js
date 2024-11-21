import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../context/GameContext"; // Si tienes un contexto de juegos
import {
  Container,
  TitleTextView,
  DescriptionGameText,
  BlueButton,
} from "../styles/GeneralStyles"; // Estilos generales
import {
  MainImage,
  GameInfoContainer,
  CarouselContainer,
  CarouselImage,
  InfoSection,
  LeftSection,
  RightSection,
  CarouselButton,
} from "../styles/GameInfoStyles"; // Estilos específicos para la página de juego

const LibraryInfo = () => {
  const { gameId } = useParams(); // Obtener el ID del juego desde la URL
  const { games } = useGames(); // Obtener los juegos del contexto de juegos
  const [gameDetails, setGameDetails] = useState(null); // Estado para almacenar los detalles del juego
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice de la imagen actual del carrusel

  useEffect(() => {
    if (!games.length) {
      console.log("Esperando que los juegos se carguen...");
      return; // Espera a que los juegos se carguen
    }

    if (!gameId) {
      console.error("No se ha proporcionado un gameId.");
      return;
    }

    console.log("gameId:", gameId); // Verificar que el gameId es correcto
    console.log("games:", games); // Verificar que los juegos se están obteniendo correctamente

    const game = games.find((game) => game._id === gameId);
    if (game) {
      setGameDetails(game);
    } else {
      console.error("Juego no encontrado.");
    }
  }, [gameId, games]); // Este efecto se ejecutará cuando cambie el gameId o los juegos

  if (!gameDetails) {
    return <p>Cargando...</p>; // Mientras se cargan los detalles, mostrar "Cargando..."
  }

  const {
    game_name,
    description,
    photos,
    developer,
    release_date,
    id_category,
    file,
  } = gameDetails;

  // Funciones para cambiar las imágenes en el carrusel
  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDownload = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = file; // Aquí debes asegurarte de que `file` sea la URL correcta del archivo
      link.download = game_name + ".exe"; // Puedes ajustar la extensión si no es un archivo .exe
      link.click();
    } else {
      alert("No hay archivo disponible para descargar.");
    }
  };

  return (
    <div>
      <Container>
        <InfoSection>
          {/* Columna izquierda con las imágenes del juego y sección de comprar */}
          <LeftSection>
            {/* Carrusel de imágenes */}
            <CarouselContainer>
              <CarouselButton onClick={goToPreviousImage}>←</CarouselButton>
              <CarouselImage
                src={photos[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
              />
              <CarouselButton onClick={goToNextImage}>→</CarouselButton>
            </CarouselContainer>
          </LeftSection>

          {/* Columna derecha con la imagen principal y detalles */}
          <RightSection>
            <MainImage src={photos[0]} alt={game_name} />
            <TitleTextView>{game_name}</TitleTextView>
            <GameInfoContainer>
              <DescriptionGameText>
                Desarrollador: {developer}
              </DescriptionGameText>
              <DescriptionGameText>
                Lanzamiento:{" "}
                {new Date(release_date).toLocaleDateString("es-ES")}
              </DescriptionGameText>
              <DescriptionGameText>
                Categoría: {id_category.category_name}
              </DescriptionGameText>
            </GameInfoContainer>
            <DescriptionGameText>{description}</DescriptionGameText>
          <BlueButton onClick={handleDownload}>Descargar</BlueButton>
          </RightSection>
        </InfoSection>
      </Container>
    </div>
  );
};

export default LibraryInfo;
