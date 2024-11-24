import React from 'react';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

interface SignalRContextType {
  invoke: (name: string, ...args: any[]) => void;
  on: (name: string, callback: (...args: any[]) => any) => void;
  isConnected: boolean;
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

  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(props.url, { logger: LogLevel.Information, skipNegotiation: false, transport: HttpTransportType.WebSockets })
      .withAutomaticReconnect()
      .build();

    newConnection.onclose(() => {
      setIsConnected(false);
    });

    newConnection.start()
      .then(() => {
        connection.current = newConnection;
        setIsConnected(true);
        console.log("Connected successfully");
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

  function invoke(name: string, ...args: any[]): void {
    if (!isConnected)
      return;
    
    connection.current.invoke(name, ...args);
  }

  function on<T extends (...args: any[]) => any>(name: string, callback: T): void {
    if (!isConnected)
      return;

    connection.current.on(name, callback);
  }

  return (
    <SignalRContext.Provider value={{ invoke, on, isConnected }}>
      {props.children}
    </SignalRContext.Provider>
  );
}
