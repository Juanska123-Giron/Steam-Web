import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../context/GameContext";
import AddToCartPopup from "../components/AddToCartPopUp";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import {
  Container,
  TitleTextView,
  DescriptionGameText,
  PriceText,
  SmallButton,
  ButtonText,
} from "../styles/GeneralStyles";
import {
  MainImage,
  GameInfoContainer,
  CarouselContainer,
  CarouselImage,
  BuySection,
  PriceBox,
  SystemRequirements,
  TitleAndIcon,
  InfoSection,
  LeftSection,
  RightSection,
  CarouselButton,
} from "../styles/GameInfoStyles";

const GameInfo = () => {
  const { gameId } = useParams();
  const { games } = useGames();
  const { addToCart } = useCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    console.log("Games data:", games);
    console.log("GameId from params:", gameId);
  }, [games, gameId]);

  if (!games || games.length === 0) {
    return <p>Cargando...</p>;
  }

  const game = games.find((game) => game._id === gameId);

  if (!game) {
    return <p>Error: No se encontró el juego.</p>;
  }

  const requirements = game.id_requirements || {};

  const handleAddToCart = () => {
    addToCart(game);
    setModalVisible(true); // Cambiar estado a true
    console.log("Modal visible: ", true); // Comprobar si se actualiza
  };

  // Funciones para cambiar las imágenes en el carrusel
  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? game.photos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === game.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Navbar />
      <Container>
        <InfoSection>
          {/* Columna izquierda con las imágenes del juego y sección de comprar */}
          <LeftSection>
            {/* Carrusel de imágenes */}
            <CarouselContainer>
              <CarouselButton onClick={goToPreviousImage}>←</CarouselButton>
              <CarouselImage
                src={game.photos[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
              />
              <CarouselButton onClick={goToNextImage}>→</CarouselButton>
            </CarouselContainer>

            {/* Sección de comprar */}
            <BuySection>
              <TitleAndIcon>
                <TitleTextView>
                  Comprar {game.game_name.toUpperCase()}
                </TitleTextView>
              </TitleAndIcon>
              <PriceBox>
                <PriceText>{`$${(game.price / 1000).toFixed(3)}`}</PriceText>
              </PriceBox>
              <SmallButton onClick={handleAddToCart}>
                <ButtonText>Añadir al carrito</ButtonText>
              </SmallButton>
              <AddToCartPopup
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                game={game}
              />
            </BuySection>
          </LeftSection>

          {/* Columna derecha con la imagen principal y detalles */}
          <RightSection>
            <MainImage src={game.photos[0]} alt={game.game_name} />
            <TitleTextView>{game.game_name}</TitleTextView>
            <GameInfoContainer>
              <DescriptionGameText>
                Desarrollador: {game.developer}
              </DescriptionGameText>
              <DescriptionGameText>
                Lanzamiento:{" "}
                {new Date(game.release_date).toLocaleDateString("es-ES")}
              </DescriptionGameText>
              <DescriptionGameText>
                Categoría: {game.id_category.category_name}
              </DescriptionGameText>
            </GameInfoContainer>
            <DescriptionGameText>{game.description}</DescriptionGameText>
          </RightSection>
        </InfoSection>

        {/* Requisitos del sistema */}
        <SystemRequirements>
          <TitleTextView>REQUISITOS DEL SISTEMA</TitleTextView>
          <DescriptionGameText>
            SO: {requirements.platform || "N/A"}
          </DescriptionGameText>
          <DescriptionGameText>
            Procesador: {requirements.processor || "N/A"}
          </DescriptionGameText>
          <DescriptionGameText>
            Memoria: {requirements.memory || "N/A"}
          </DescriptionGameText>
          <DescriptionGameText>
            Gráficos: {requirements.graphics || "N/A"}
          </DescriptionGameText>
          <DescriptionGameText>
            Almacenamiento: {requirements.storage || "N/A"}
          </DescriptionGameText>
        </SystemRequirements>
      </Container>
    </div>
  );
};

export default GameInfo;
