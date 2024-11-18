import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 40px;
  margin: 0;
  background-color: #1a2a3d;
`;

export const TitleTextView = styled.h1`
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const SecundaryTitleText = styled.h2`
  font-size: 16px;
  color: #fff;
  margin-bottom: 4px;
  font-weight: 600;
`;

export const ButtonText = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 600;
`;

export const PriceText = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 300;
`;

export const DescriptionGameText = styled.p`
  font-size: 14px;
  color: #7b8d9d;
  margin-bottom: 4px;
  font-weight: 300;
`;

export const FormText = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 300;
`;

export const DeleteText = styled.span`
  font-size: 14px;
  color: #d9d9d9;
  font-weight: 300;
  text-decoration-line: underline;
`;

export const SmallButton = styled.button`
  background-color: #77b322;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #77b322;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 210px;
  margin: 0 auto;
`;


export const GrayButton = styled.button`
  background-color: #616e78;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const BlueButton = styled.button`
  background-color: #225999;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const RedButton = styled.button`
  background-color: #cf352b;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const InputBox = styled.input`
  background-color: #1a1e29;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColumnBox = styled.div`
  flex: 0.48;
`;
