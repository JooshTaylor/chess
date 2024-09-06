import { GameState } from "../reducers/GameReducer";

export const INITIAL_GAME_STATE: GameState = {
  turnColour: 'light',
  selectedPiece: '',
  status: 'running',
  moves: [],

  positions: {
    // X pos then Y
    1: {
      1: 'light-rook-1',
      2: 'light-pawn-1',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-1',
      8: 'dark-rook-1'
    },
    2: {
      1: 'light-knight-1',
      2: 'light-pawn-2',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-2',
      8: 'dark-knight-1'
    },
    3: {
      1: 'light-bishop-1',
      2: 'light-pawn-3',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-3',
      8: 'dark-bishop-1',
    },
    4: {
      1: 'light-queen',
      2: 'light-pawn-4',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-4',
      8: 'dark-queen',
    },
    5: {
      1: 'light-king',
      2: 'light-pawn-5',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-5',
      8: 'dark-king',
    },
    6: {
      1: 'light-bishop-2',
      2: 'light-pawn-6',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-6',
      8: 'dark-bishop-2',
    },
    7: {
      1: 'light-knight-2',
      2: 'light-pawn-7',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-7',
      8: 'dark-knight-2'
    },
    8: {
      1: 'light-rook-2',
      2: 'light-pawn-8',
      3: '',
      4: '',
      5: '',
      6: '',
      7: 'dark-pawn-8',
      8: 'dark-rook-2'
    }
  },

  pieces: {
    // DARK: First row
    'dark-rook-1': {
      id: 'dark-rook-1',
      type: 'rook',
      originalType: 'rook',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-knight-1': {
      id: 'dark-knight-1',
      type: 'knight',
      originalType: 'knight',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-bishop-1': {
      id: 'dark-bishop-1',
      type: 'bishop',
      originalType: 'bishop',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-king': {
      id: 'dark-king',
      type: 'king',
      originalType: 'king',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-queen': {
      id: 'dark-queen',
      type: 'queen',
      originalType: 'queen',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-bishop-2': {
      id: 'dark-bishop-2',
      type: 'bishop',
      originalType: 'bishop',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-knight-2': {
      id: 'dark-knight-2',
      type: 'knight',
      originalType: 'knight',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'dark-rook-2': {
      id: 'dark-rook-2',
      type: 'rook',
      originalType: 'rook',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    // DARK: Second row

    'dark-pawn-1': {
      id: 'dark-pawn-1',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-2': {
      id: 'dark-pawn-2',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-3': {
      id: 'dark-pawn-3',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-4': {
      id: 'dark-pawn-4',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-5': {
      id: 'dark-pawn-5',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-6': {
      id: 'dark-pawn-6',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-7': {
      id: 'dark-pawn-7',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'dark-pawn-8': {
      id: 'dark-pawn-8',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'dark',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    // LIGHT: Seventh row

    'light-pawn-1': {
      id: 'light-pawn-1',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-2': {
      id: 'light-pawn-2',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-3': {
      id: 'light-pawn-3',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-4': {
      id: 'light-pawn-4',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-5': {
      id: 'light-pawn-5',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-6': {
      id: 'light-pawn-6',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-7': {
      id: 'light-pawn-7',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    'light-pawn-8': {
      id: 'light-pawn-8',
      type: 'pawn',
      originalType: 'pawn',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },

    // LIGHT: Eighth row
    'light-rook-1': {
      id: 'light-rook-1',
      type: 'rook',
      originalType: 'rook',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-knight-1': {
      id: 'light-knight-1',
      type: 'knight',
      originalType: 'knight',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-bishop-1': {
      id: 'light-bishop-1',
      type: 'bishop',
      originalType: 'bishop',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-king': {
      id: 'light-king',
      type: 'king',
      originalType: 'king',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-queen': {
      id: 'light-queen',
      type: 'queen',
      originalType: 'queen',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-bishop-2': {
      id: 'light-bishop-2',
      type: 'bishop',
      originalType: 'bishop',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-knight-2': {
      id: 'light-knight-2',
      type: 'knight',
      originalType: 'knight',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    },
    'light-rook-2': {
      id: 'light-rook-2',
      type: 'rook',
      originalType: 'rook',
      colour: 'light',
      status: 'alive',
      totalMoves: 0,
      turnsSinceLastMove: 0
    }
  }
};