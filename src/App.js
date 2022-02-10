import { useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { userRefresh } from './redux/user/operation';
import { getIsLoggedIn } from './redux/user/selectors';

// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import ModalNewCard from "./components/modal/ModalNewCard";

import { routes, PublicRoute, PrivateRoute } from './routes';

import './App.css';

const AuthPage = lazy(() =>
  import('./pages/AuthPage' /* webpackChunkName: 'AuthPage' */),
);
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: 'HomePage' */),
);
const ResetPage = lazy(() =>
  import('./pages/ResetPasswordPage' /* webpackChunkName: 'HomePage' */),
);
const ChangePassword = lazy(() =>
  import('./pages/ChangePasswordPage' /* webpackChunkName: 'HomePage' */),
);

function App() {
  const dispatch = useDispatch(userRefresh);
  const isUserLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    console.log(isUserLoggedIn)
    if (isUserLoggedIn) {
      dispatch(userRefresh());
    }
  });

  return (
    <div className="App">
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TailSpin color="#00BFFF" height={100} width={100} />
          </div>
        }
      >
        <Switch>
          <PublicRoute path={routes.auth} restricted>
            <AuthPage />
          </PublicRoute>

          <PublicRoute path="/reset" restricted>
            <ResetPage />
          </PublicRoute>

          <PublicRoute path="/api/users/change-password/:link" restricted>
            <ChangePassword />
          </PublicRoute>

          <PrivateRoute path={routes.home} restricted redirectTo={routes.auth}>
            <HomePage />
          </PrivateRoute>

          <Redirect to={routes.auth} />
        </Switch>
      </Suspense>
      {/* <AuthPage />

      <HomePage /> */}
    </div>
  );
}

export default App;
