import { ChessBoard } from '../../components/board/ChessBoard';
import { useParams } from 'react-router-dom';
import { useSignalR } from '../../context/SignalRContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Game } from '../../interfaces/Game';
import React from 'react';
import { getPlayerId } from '../../utils/getPlayerId';
import { GameStatus } from '../../enums/GameStatus';

export function GameView(): JSX.Element {
  const params = useParams();

  const signalR = useSignalR();

  const game = useQuery({
    queryKey: [`game:${params.id}`],
    queryFn: () => axios.get<Game>(`/api/games/${params.id}`)
  });

  React.useEffect(() => {
    if (!game.isSuccess || !signalR.isConnected)
      return;

    const currentPlayerId = getPlayerId(game.data.data.id);

    // Player is spectating a game that has already started
    if (!currentPlayerId && game.data.data.status !== GameStatus.Pending)
      return;

    signalR.onJoinGame(game.data.data.id, currentPlayerId);
  }, [ game.isSuccess, signalR.isConnected ]);

  // TODO: Loading states
  if (!game.isSuccess)
    return <></>;

  return (
    <ChessBoard game={game.data.data} />
  );
}