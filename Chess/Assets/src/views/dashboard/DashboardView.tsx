import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "../../interfaces/Game";
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

  const createGameMutation = useMutation({
    mutationFn: () => axios.post<Game>('/api/games', body),
    onSuccess: data => {
      navigate(`/chess/${data.data.id}`);
    }
  });

  function onClickCreateGame(): void {
    createGameMutation.mutate();
  }

  return (
    <div>
      <div>
        Dashboard
      </div>

      <div>
        <Link to='/chess'>
          Chess
        </Link>
      </div>

      <button onClick={onClickCreateGame}>Create a game</button>
    </div>
  );
}