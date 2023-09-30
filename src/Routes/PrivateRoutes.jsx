import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
          height: "100vh",
        }}
      >
        <FallingLines
          color="#4fa94d"
          width="150"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }
  if (user.emailVerified) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};
PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
