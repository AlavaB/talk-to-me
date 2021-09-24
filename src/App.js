import { Route, Switch } from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import PostsPage from './pages/PostsPage';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <AuthPage />
        </Route>
        <Route path='/posts'>
          <PostsPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
