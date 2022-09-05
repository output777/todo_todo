import './App.css';
import Layout from './components/utils/Layout';
import Router from './shared/Router';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
