import { Provider } from 'react-redux';
import './App.css';
import { Inbox } from './components';
import store from './lib/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Inbox />
      </Provider>
     
    </div>
  );
}

export default App;
