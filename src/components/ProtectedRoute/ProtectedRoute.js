import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  // console.log(props.path);
  return (
    <Route exact path={props.path}>
      {() =>
        props.isLoggedIn || !props.isTokenChecked ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signup' />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
