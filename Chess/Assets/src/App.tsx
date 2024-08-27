import { ChessBoard } from './components/board/ChessBoard';
import React from "react";
function App() {
  React.useEffect(() => {
    fetch('/api/game')
        .then(res => res.json())
        .then(console.log);
  }, []);
  
  return (
    <ChessBoard />
  );
}
export default App;
