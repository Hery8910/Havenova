import React from 'react';
import tinycolor from 'tinycolor2';

interface AvatarInicialProps {
  username: string;
  color: string;
}

const AvatarInicial: React.FC<AvatarInicialProps> = ({ username, color }) => {
  const inicial = username.charAt(0).toUpperCase();

  const colorBase = tinycolor(color);

  const colorTransparente = colorBase.setAlpha(0.2).toRgbString();
  const colorSolido = colorBase.toRgbString();

  const colorTexto = colorBase.isLight()
    ? colorBase.darken(50).toHexString()
    : colorBase.lighten(50).toHexString();

  const estilo: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    borderWidth: '4px',
    borderStyle: 'solid',
    background: `
      linear-gradient(180deg, ${colorSolido} 40%, ${colorTransparente} 100%) padding-box,
      linear-gradient(0deg, ${colorSolido} 70%, ${colorTransparente} 100%) border-box
    `,
    borderRadius: '50%',
    border: '4px solid transparent',
    boxShadow: `
      0px 0px 10px ${colorBase.setAlpha(0.5).lighten(40).toRgbString()},
      5px 5px 10px ${colorBase.setAlpha(0.5).darken(40).toRgbString()}
    `,
    color: colorTexto,
  };

  return <div style={estilo}>{inicial}</div>;
};

export default AvatarInicial;
