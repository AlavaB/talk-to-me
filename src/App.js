import { Route } from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <Layout>
      <Route path='/' exact>
        <AuthPage />
      </Route>
    </Layout>
  );
}

export default App;
