export function getPlayerId(gameId: number): string {
  return window.localStorage.getItem(gameId.toString());
}