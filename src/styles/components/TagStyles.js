import styled from "styled-components";

export const TagButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isSelected ? "#31BCFC" : "#303649")};
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 10px;
  min-width: 100px;
  color: white;
  border: none;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    opacity: 0.9;
  }
`;

export const TagContainer = styled.div`
  margin-top: -55px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
`;

export const TagList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;
