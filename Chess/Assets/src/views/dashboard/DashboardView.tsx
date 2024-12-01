import axios from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "../../interfaces/Game";
import { GameStatus } from "../../enums/GameStatus";
import { CreateGameRequest } from "../../interfaces/requests/CreateGameRequest";

export function DashboardView(): JSX.Element {
  const navigate = useNavigate();

  const body: CreateGameRequest = {
    timeControl: {
      type: 'rapid',
      time: 600000,
      increment: 0
    }
  };

  const activeGames = useQuery({
    queryKey: [`games:status:${GameStatus.Running}`],
    queryFn: () => axios.get<Game[]>(`/api/v1/games?status=${GameStatus.Running}`)
  });

  const createGameMutation = useMutation({
    mutationFn: () => axios.post<Game>('/api/v1/games', body),
    onSuccess: async data => {
      navigate(`/games/${data.data.id}`);
    }
  });

  function onClickCreateGame(): void {
    createGameMutation.mutate();
  }

  return (
    <div className=''>
      <ul>
        {activeGames.data?.data?.map(game => {
          return (
            <li>
              <Link to={`/games/${game.id}`}>
                Spectate: {game.id}
              </Link>
            </li>
          );
        })}
      </ul>

      <button onClick={onClickCreateGame}>
        Create a game
      </button>
    </div>
  );
}