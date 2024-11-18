import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../context/GameContext"; // Importamos el hook del contexto
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
} from "../styles/GameInfoStyles";

const GameInfo = () => {
  const { gameId } = useParams();
  const { games } = useGames(); // Usamos el contexto de juegos
  const { addToCart } = useCart();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Games data:", games); // Verifica si games llega correctamente
    console.log("GameId from params:", gameId); // Verifica el gameId
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
    addToCart(game); // Usa addToCart del contexto
    setModalVisible(true); // Muestra el pop-up
  };

  return (
    <div>
      <Navbar />
      <Container>
        <MainImage src={game.photos[0]} alt={game.game_name} />
        <GameInfoContainer>
          <TitleTextView>{game.game_name}</TitleTextView>
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

        {/* Carrusel de imágenes */}
        <CarouselContainer>
          {game.photos.slice(1).map((photo, index) => (
            <CarouselImage
              key={index}
              src={photo}
              alt={`Imagen ${index + 1}`}
            />
          ))}
        </CarouselContainer>

        {/* Comprar sección */}
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
            <ButtonText>Añadir al carro</ButtonText>
          </SmallButton>
          <AddToCartPopup
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            game={game}
          />
        </BuySection>

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
