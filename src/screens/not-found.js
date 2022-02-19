import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PageHeader from "../components/header.js";
import { useAuth } from "../context/auth-context";

const NotFoundStyles = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;
function NotFoundScreen() {
  const { user } = useAuth();

  return (
    <>
      <PageHeader page="NotFound" name={user.name} />

      <main>
        <NotFoundStyles>
          <div>
            Sorry... nothing here. <Link to="/">Go home</Link>
          </div>
        </NotFoundStyles>
      </main>
    </>
  );
}

export { NotFoundScreen };
