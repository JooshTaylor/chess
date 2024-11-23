import React from 'react';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

interface SignalRContextType {
  onJoinGame: (id: number, currentPlayerId?: string) => void;
}

const SignalRContext = React.createContext<SignalRContextType>(null);

export function useSignalR(): SignalRContextType {
  const context = React.useContext(SignalRContext);

  if (!context)
    throw new Error('useSignalR must be used within a SignalRProvider');

  return context;
}

interface SignalRProviderProps {
  url: string;
}

export function SignalRProvider(props: React.PropsWithChildren<SignalRProviderProps>) {
  const connection = React.useRef<HubConnection>(null);

  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [queue, setQueue] = React.useState([]);

  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(props.url, { logger: LogLevel.Information, skipNegotiation: false, transport: HttpTransportType.WebSockets })
      .withAutomaticReconnect()
      .build();

    newConnection.on('JoinGameSuccess', (playerId: string) => {
      console.log('joined game', playerId);
    });

    newConnection.onclose(() => {
      setIsConnected(false);
    });

    newConnection.start()
      .then(() => {
          connection.current = newConnection;
          setIsConnected(true);
          console.log("Connected successfully");

          for (const fn of queue) {
            fn();
          }

          setQueue([]);
      })
      .catch((err) => {
          console.error("Connection failed:", err);
      });

    return () => {
      if (newConnection) {
        newConnection.stop().catch((err) => console.error('SignalR stop error:', err));
      }
    };
  }, [props.url]);

  function queueOrExecuteTask(fn: () => void): void {
    if (isConnected)
      return fn();

    queue.push(fn);
  }

  function onJoinGame(id: number, currentPlayerId?: string): void {
    queueOrExecuteTask(() => {
      connection.current.invoke("JoinGame", id, currentPlayerId)
        .catch(err => {
          console.log('Cannot join game', err);
        });
    });
  }

  return (
    <SignalRContext.Provider value={{ onJoinGame }}>
      {props.children}
    </SignalRContext.Provider>
  );
}
