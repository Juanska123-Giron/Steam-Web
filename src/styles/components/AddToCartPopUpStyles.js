import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000; // Asegúrate de que el modal esté por encima de otros elementos

  // Control de visibilidad con opacity y visibility
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
`;

export const ModalView = styled.div`
  width: 350px;
  background-color: #576674;
  border-radius: 10px;
  padding: 20px;
`;

export const GameImage = styled.img`
  width: 100%;
  height: 170px;
  resize-mode: contain;
`;
