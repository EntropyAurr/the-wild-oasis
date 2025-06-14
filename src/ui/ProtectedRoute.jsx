import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated, fetchStatus } = useUser();

  // 2. If there is NO authenticated user => redirect to /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isPending && fetchStatus !== "fetching") navigate("/login");
    },
    [isAuthenticated, isPending, fetchStatus, navigate]
  );

  // 3. While loading => show a Spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user => render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
