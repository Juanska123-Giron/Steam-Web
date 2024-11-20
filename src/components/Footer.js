import React from "react";
import {
  FooterContainer,
  FooterTop,
  FooterRow,
  FooterColumn,
  FooterLogo,
  FooterText,
  FooterBottom,
  FooterNav,
} from "../styles/FooterStyles";
import steamAltLogo from "../assets/steamv2.png";
import valveLogo from "../assets/valve.png";

function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterRow>
          {/* Logo de Valve (izquierda) */}
          <FooterColumn left>
            <FooterLogo>
              <img src={valveLogo} alt="Valve Logo" />
            </FooterLogo>
          </FooterColumn>

          {/* Información de texto */}
          <FooterColumn middle>
            <FooterText>
              <br />© 2024 Valve Corporation. All rights reserved. All trademarks are property of
              their respective owners in the US and other countries. VAT included in all prices
              where applicable.
              <a href="#">Privacy Policy</a> | <a href="#">Legal</a> |{" "}
              <a href="#">Steam Subscriber Agreement</a> | <a href="#">Refunds</a> |{" "}
              <a href="#">Cookies</a>
            </FooterText>
          </FooterColumn>

          {/* Logo de Steam (derecha) */}
          <FooterColumn right>
            <FooterLogo>
              <img src={steamAltLogo} alt="Steam Logo" />
            </FooterLogo>
          </FooterColumn>
        </FooterRow>
      </FooterTop>

      {/* Navegación inferior */}
      <FooterBottom>
        <FooterNav>
          <a href="#">About Valve</a>
          <a href="#">Jobs</a>
          <a href="#">Steamworks</a>
          <a href="#">Steam Distribution</a>
          <a href="#">Support</a>
          <a href="#">Gift Cards</a>
          <a href="#">Facebook</a>
          <a href="#">X@steam22</a>
        </FooterNav>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
