﻿using Chess.Models.Entities;
using Chess.Models.Requests;

namespace Chess.Services.Interfaces;

public interface IGameService
{
    IEnumerable<Game> GetGames();
    Game GetGame(ulong id);
    Game CreateGame(CreateGameRequest request);
}