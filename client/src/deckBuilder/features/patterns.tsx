import * as React from 'react';

export const patterns = {
    open: (shape: JSX.Element, _color: string, _scale: number | null) =>
        (
                <g style={{fill: 'transparent'}}>
                {shape}
            </g>
        ),
    solid: (shape: JSX.Element, color: string, _scale: number | null) =>
        (
                <g style={{fill: color}}>
                {shape}
            </g>
        ),
    striped: (shape: JSX.Element, color: string, scale: number | null) =>
        (
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
        )
}
