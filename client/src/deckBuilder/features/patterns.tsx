import * as React from 'react';

export const patterns = {
  open: (shape: JSX.Element, _color: string, _scale: number | null) => (
    <g style={{fill: 'transparent'}}>
      {shape}
    </g>
  ),
  solid: (shape: JSX.Element, color: string, _scale: number | null) => (
    <g style={{fill: color}}>
      {shape}
    </g>
  ),
  striped: (shape: JSX.Element, color: string, scale: number | null) => (
    <g style={{fill: `url(#pattern)`}}>
      <pattern
        id={`pattern`}
        width="8"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(90) ${scale ? `scale(${scale})` : ''}`}
      >
        <line stroke={color} strokeWidth="5px" y2="15"/>
      </pattern>
      {shape}
    </g>
  ),
  gradient: (shape: JSX.Element, color: string, _scale: number | null) => (
    <g style={{fill: `url(#Gradient2)`}}>
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color}/>
          <stop offset="100%" stopColor="#fff"/>
        </linearGradient>
      </defs>
      {shape}
    </g>
  ),
  triangles: (shape: JSX.Element, color: string, scale: number | null) => (
    <g style={{fill: `url(#pattern)`}}>
      <defs>
        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="15,10 25,10 20,20"/>
        </pattern>
      </defs>
      {shape}
    </g>
  ),
  crinkle: (shape: JSX.Element, color: string, _scale: number | null) => (
    <g style={{filter: `url(#turbuMap)`, fill: color}}>
      <defs>
        <filter id="turbuMap">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
            data-filterid="3"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            in="SourceGraphic"
            in2="turbulence"
            scale="100"
          />
        </filter>
      </defs>
      {shape}
    </g>
  ),
  blur: (shape: JSX.Element, color: string, _scale: number | null) => (
    <g style={{filter: `url(#blurMe)`, fill: color}}>
      <defs>
        <filter id="blurMe">
         <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
        </filter>
      </defs>
      {shape}
    </g>
  ),
  ink: (shape: JSX.Element, color: string, scale: number | null) => (
    <g style={{filter: `url(#displacementFilter)`, fill: color}}>
      <defs>
        <filter id="displacementFilter">
          <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="2" result="turbulence"/>
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      {shape}
    </g>
  )
};
