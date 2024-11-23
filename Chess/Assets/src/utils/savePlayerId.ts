export function savePlayerId(gameId: number, playerId: string): void {
  window.localStorage.setItem(gameId.toString(), playerId);
}