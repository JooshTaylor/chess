import { PieceProps } from "./PieceProps";

export function Queen(props: PieceProps): JSX.Element {
  if (props.colour === 'black') {
    return (
      <svg width="45" height="45">
        <g style={{fill: "#000000", stroke: "#000000", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round"}}>
          <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
            style={{strokeLinecap: "butt", fill: "#000000"}} />
          <path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" />
          <path d="M 11.5,30 C 15,29 30,29 33.5,30" />
          <path d="m 12,33.5 c 6,-1 15,-1 21,0" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="14" cy="9" r="2" />
          <circle cx="22.5" cy="8" r="2" />
          <circle cx="31" cy="9" r="2" />
          <circle cx="39" cy="12" r="2" />
          <path d="M 11,38.5 A 35,35 1 0 0 34,38.5"
            style={{fill: "none", stroke: "#000000", strokeLinecap: "butt"}} />
          <g style={{fill: "none", stroke: "#ffffff"}}>
            <path d="M 11,29 A 35,35 1 0 1 34,29" />
            <path d="M 12.5,31.5 L 32.5,31.5" />
            <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" />
            <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" />
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg width="45" height="45">
      <g style={{fill: "#ffffff", stroke: "#000000", strokeWidth: 1.5, strokeLinejoin: "round"}}>
        <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/>
        <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/>
        <path d="M 11.5,30 C 15,29 30,29 33.5,30" style={{fill: "none"}}/>
        <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style={{fill: "none"}}/>
        <circle cx="6" cy="12" r="2" />
        <circle cx="14" cy="9" r="2" />
        <circle cx="22.5" cy="8" r="2" />
        <circle cx="31" cy="9" r="2" />
        <circle cx="39" cy="12" r="2" />
      </g>
    </svg>
  );
}