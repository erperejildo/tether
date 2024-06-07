import { Provider } from 'react-redux';
import './App.css';
import CryptoTable from './components/CryptoTable/CryptoTable';
import { store } from './redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;
