import { GameState } from "../reducers/GameReducer";

export const INITIAL_GAME_STATE: GameState = {
  turnColour: 'white',
  selectedPiece: '',
  status: 'running',

  positions: {
    // X pos then Y
    1: {
      1: 'white-rook-1',
      2: 'white-pawn-1',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-1',
      8: 'black-rook-1'
    },
    2: {
      1: 'white-knight-1',
      2: 'white-pawn-2',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-2',
      8: 'black-knight-1'
    },
    3: {
      1: 'white-bishop-1',
      2: 'white-pawn-3',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-3',
      8: 'black-bishop-1',
    },
    4: {
      1: 'white-queen',
      2: 'white-pawn-4',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-4',
      8: 'black-queen',
    },
    5: {
      1: 'white-king',
      2: 'white-pawn-5',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-5',
      8: 'black-king',
    },
    6: {
      1: 'white-bishop-2',
      2: 'white-pawn-6',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-6',
      8: 'black-bishop-2',
    },
    7: {
      1: 'white-knight-2',
      2: 'white-pawn-7',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-7',
      8: 'black-knight-2'
    },
    8: {
      1: 'white-rook-2',
      2: 'white-pawn-8',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'black-pawn-8',
      8: 'black-rook-2'
    }
  },

  pieces: {
    // BLACK: First row
    'black-rook-1': {
      id: 'black-rook-1',
      type: 'rook',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-knight-1': {
      id: 'black-knight-1',
      type: 'knight',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-bishop-1': {
      id: 'black-bishop-1',
      type: 'bishop',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-king': {
      id: 'black-king',
      type: 'king',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-queen': {
      id: 'black-queen',
      type: 'queen',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-bishop-2': {
      id: 'black-bishop-2',
      type: 'bishop',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-knight-2': {
      id: 'black-knight-2',
      type: 'knight',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },
    'black-rook-2': {
      id: 'black-rook-2',
      type: 'rook',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    // BLACK: Second row

    'black-pawn-1': {
      id: 'black-pawn-1',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-2': {
      id: 'black-pawn-2',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-3': {
      id: 'black-pawn-3',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-4': {
      id: 'black-pawn-4',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-5': {
      id: 'black-pawn-5',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-6': {
      id: 'black-pawn-6',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-7': {
      id: 'black-pawn-7',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    'black-pawn-8': {
      id: 'black-pawn-8',
      type: 'pawn',
      colour: 'black',
      status: 'alive',
      totalMoves: 0
    },

    // WHITE: Seventh row

    'white-pawn-1': {
      id: 'white-pawn-1',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-2': {
      id: 'white-pawn-2',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-3': {
      id: 'white-pawn-3',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-4': {
      id: 'white-pawn-4',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-5': {
      id: 'white-pawn-5',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-6': {
      id: 'white-pawn-6',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-7': {
      id: 'white-pawn-7',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    'white-pawn-8': {
      id: 'white-pawn-8',
      type: 'pawn',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },

    // WHITE: Eighth row
    'white-rook-1': {
      id: 'white-rook-1',
      type: 'rook',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-knight-1': {
      id: 'white-knight-1',
      type: 'knight',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-bishop-1': {
      id: 'white-bishop-1',
      type: 'bishop',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-king': {
      id: 'white-king',
      type: 'king',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-queen': {
      id: 'white-queen',
      type: 'queen',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-bishop-2': {
      id: 'white-bishop-2',
      type: 'bishop',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-knight-2': {
      id: 'white-knight-2',
      type: 'knight',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    },
    'white-rook-2': {
      id: 'white-rook-2',
      type: 'rook',
      colour: 'white',
      status: 'alive',
      totalMoves: 0
    }
  }
};