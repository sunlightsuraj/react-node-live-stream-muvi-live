import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { StreamWrapper } from './context/stream-context';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
      <StreamWrapper>
      <Home />
    </StreamWrapper>
    </SnackbarProvider>
  );
}

export default App;
