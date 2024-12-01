import { ChessBoard } from '../../components/board/ChessBoard';
import { useParams } from 'react-router-dom';
import { useSignalR } from '../../context/SignalRContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Game } from '../../interfaces/Game';
import React from 'react';
import { getPlayerId } from '../../utils/getPlayerId';
import { GameStatus } from '../../enums/GameStatus';
import { Messages } from '../../constants/Messages';
import { savePlayerId } from '../../utils/savePlayerId';
import { Position } from '../../interfaces/Position';
import { CreateMoveRequest } from '../../interfaces/requests/CreateMoveRequest';

export function GameView(): JSX.Element {
  const params = useParams();
  const signalR = useSignalR();
  const queryClient = useQueryClient()

  const game = useQuery({
    queryKey: [`game:${params.id}`],
    queryFn: () => axios.get<Game>(`/api/v1/games/${params.id}`)
  });

  const moveMutation = useMutation({
    mutationFn: (body: CreateMoveRequest) => axios.post(`/api/v1/games/${params.id}/moves`, body),
    onSuccess: data => {
      console.log('Success', data);
    }
  });

  React.useEffect(() => {
    if (!game.isSuccess || !signalR.isConnected)
      return;

    signalR.on(Messages.Server.JOIN_GAME_SUCCESS, (gameId: number, playerId: string) => {
      savePlayerId(gameId, playerId);
      queryClient.invalidateQueries({ queryKey: [`game:${gameId}`] });
    });

    signalR.on(Messages.Server.START_GAME, game => {
      queryClient.setQueryData([`game:${game.id}`], game);
    });

    const currentPlayerId = getPlayerId(game.data.data.id);

    // Player is spectating a game that has already started
    if (!currentPlayerId && game.data.data.status !== GameStatus.Pending)
      return;

    signalR.invoke(Messages.Client.JOIN_GAME, game.data.data.id, currentPlayerId);
  }, [ game.isSuccess, signalR.isConnected ]);

  async function onMove(pieceId: number, targetPosition: Position): Promise<void> {
    await moveMutation.mutateAsync({ pieceId, ...targetPosition });
  }

  // TODO: Loading states
  if (!game.isSuccess)
    return <></>;

  return (
    <ChessBoard
      game={game.data.data}
      onMove={onMove}
    />
  );
}