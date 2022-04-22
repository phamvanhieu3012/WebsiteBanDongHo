import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  let history = useHistory();

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              // return <Redirect to="/login" />;
              history.push("/login");
            }

            if (isAdmin === true && user.role !== "staff") {
              // return <Redirect to="/login" />;
              history.push("/login");
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
