import { store } from './redux/store'
import { Provider } from 'react-redux'
import Page from './compenents/Page';

function App() {
  return (<Provider store={store}>
    <div className="App">
      <Page />
    </div>
    </Provider>
  );
}

export default App;
