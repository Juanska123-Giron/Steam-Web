import React from "react";
import { TagButton, TagContainer, TagList } from "../styles/components/TagStyles";
import { ButtonText } from "../styles/GeneralStyles";

const Tag = ({ children, onClick, isSelected }) => (
  <TagButton isSelected={isSelected} onClick={onClick}>
    <ButtonText>{children}</ButtonText> {/* Aquí envolvemos el contenido con ButtonText */}
  </TagButton>
);

export const TagGroup = ({ tags, selectedTags, onTagClick }) => (
  <TagContainer>
    <TagList>
      {tags.map((tag) => (
        <Tag
          key={tag}
          isSelected={selectedTags.includes(tag)}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </TagList>
  </TagContainer>
);

export default Tag;
