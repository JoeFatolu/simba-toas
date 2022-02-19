import React from "react";
import styled from "styled-components";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { NotFoundScreen } from "./screens/not-found";
import DashBoard from "./screens/Dashboard";
import Dialog from "./modal";
import CreateTransaction from "./screens/create-transaction";

const AuthenticatedAppStyles = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 65px 1fr;
  grid-template-columns: 1fr;
  overflow: hidden;
  position: relative;
  main {
    background: #fafcff;
    grid-row: 2/3;
    grid-column: 1/2;
    padding: 30px;
    overflow: auto;
  }
  .mobile-layout-trigger {
    height: 48px;
    width: 48px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 100%;
    background-color: #fff;
    transition: background-color 0.5s ease;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      opacity: 1;
    }
    &:hover {
      background-color: rgba(0, 102, 245, 0.07);
    }
  }
  @media (min-width: 1300px) {
    grid-template-columns: 260px 1fr;
    main {
      grid-row: 2/3;
      grid-column: 2/3;
      overflow: auto;
    }

    .mobile-layout-trigger {
      display: none;
    }
  }
`;

const NavStyles = styled.nav`
  display: none;
  @media (min-width: 1300px) {
    display: block;
    grid-row: 1/3;
    grid-column: 1/2;
    background: #081a51;
  }

  .nav-content {
    /* display: flex; */
    color: #fff;
    & > header {
      padding: 24px 10px 45px 24px;
      display: flex;
      svg {
        margin-right: 16px;
      }
      h2 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        text-transform: capitalize;
      }
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .dropdownSection {
      margin-left: 16px;
      margin-bottom: 28px;
      header {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 13px;
        color: #51cbff;
        text-transform: uppercase;
        margin-bottom: 10px;
        margin-left: 14px;
      }
      ul {
        list-style: none;
        li {
          span {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 18px;
            /* identical to box height */
            color: #ccd2e3;
          }
        }
      }
    }
  }
`;

const NavlinkStyled = styled(NavLink)`
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-decoration: none;
  svg {
    margin-right: 15px;
  }
  .icon {
    stroke: #ccd2e3;
  }
  &.active {
    background: rgba(143, 143, 143, 0.2);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    span {
      color: #fff !important;
    }
    .icon {
      stroke: #fff;
    }
  }
  &:hover {
    span {
      color: #fff !important;
    }
    .icon {
      stroke: #fff;
    }
  }
`;

const NavModal = styled.div`
  nav {
    display: block !important;
    background: #081a51;
    width: 300px;
    height: 100vh;
    max-width: 260px;
    position: relative;
    box-shadow: 5px 0 20px 2px rgb(0 0 0 / 5%);
    animation: fadeIn 0.34s cubic-bezier(0.24, 1, 0.32, 1);

    @keyframes fadeIn {
      from {
        opacity: 0;
        visibility: hidden;
        transform: translate3d(-260px, 0, 0);
      }
      to {
        transform: translate3d(-2%, 0, 0);
        visibility: visible;
      }
    }
  }
`;

const Nav = ({ user }) => {
  return (
    <NavStyles>
      <div className="nav-content">
        <header>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="55" height="55" rx="7.5" fill="white" stroke="#E8E8E8" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.9997 29.3335C19.2663 29.3335 18.6663 29.9335 18.6663 30.6668C18.6663 31.4002 19.2663 32.0002 19.9997 32.0002C20.733 32.0002 21.333 31.4002 21.333 30.6668C21.333 29.9335 20.733 29.3335 19.9997 29.3335ZM19.9997 34.6668C19.2663 34.6668 18.6663 35.2668 18.6663 36.0002C18.6663 36.7335 19.2663 37.3335 19.9997 37.3335C20.733 37.3335 21.333 36.7335 21.333 36.0002C21.333 35.2668 20.733 34.6668 19.9997 34.6668ZM19.9997 24.0002C19.2663 24.0002 18.6663 24.6002 18.6663 25.3335C18.6663 26.0668 19.2663 26.6668 19.9997 26.6668C20.733 26.6668 21.333 26.0668 21.333 25.3335C21.333 24.6002 20.733 24.0002 19.9997 24.0002ZM15.9997 24.6668C15.6263 24.6668 15.333 24.9602 15.333 25.3335C15.333 25.7068 15.6263 26.0002 15.9997 26.0002C16.373 26.0002 16.6663 25.7068 16.6663 25.3335C16.6663 24.9602 16.373 24.6668 15.9997 24.6668ZM19.9997 18.6668C19.2663 18.6668 18.6663 19.2668 18.6663 20.0002C18.6663 20.7335 19.2663 21.3335 19.9997 21.3335C20.733 21.3335 21.333 20.7335 21.333 20.0002C21.333 19.2668 20.733 18.6668 19.9997 18.6668ZM39.9997 26.0002C40.373 26.0002 40.6663 25.7068 40.6663 25.3335C40.6663 24.9602 40.373 24.6668 39.9997 24.6668C39.6263 24.6668 39.333 24.9602 39.333 25.3335C39.333 25.7068 39.6263 26.0002 39.9997 26.0002ZM30.6663 21.3335C31.3997 21.3335 31.9997 20.7335 31.9997 20.0002C31.9997 19.2668 31.3997 18.6668 30.6663 18.6668C29.933 18.6668 29.333 19.2668 29.333 20.0002C29.333 20.7335 29.933 21.3335 30.6663 21.3335ZM30.6663 16.6668C31.0397 16.6668 31.333 16.3735 31.333 16.0002C31.333 15.6268 31.0397 15.3335 30.6663 15.3335C30.293 15.3335 29.9997 15.6268 29.9997 16.0002C29.9997 16.3735 30.293 16.6668 30.6663 16.6668ZM15.9997 30.0002C15.6263 30.0002 15.333 30.2935 15.333 30.6668C15.333 31.0402 15.6263 31.3335 15.9997 31.3335C16.373 31.3335 16.6663 31.0402 16.6663 30.6668C16.6663 30.2935 16.373 30.0002 15.9997 30.0002ZM25.333 39.3335C24.9597 39.3335 24.6663 39.6268 24.6663 40.0002C24.6663 40.3735 24.9597 40.6668 25.333 40.6668C25.7063 40.6668 25.9997 40.3735 25.9997 40.0002C25.9997 39.6268 25.7063 39.3335 25.333 39.3335ZM25.333 16.6668C25.7063 16.6668 25.9997 16.3735 25.9997 16.0002C25.9997 15.6268 25.7063 15.3335 25.333 15.3335C24.9597 15.3335 24.6663 15.6268 24.6663 16.0002C24.6663 16.3735 24.9597 16.6668 25.333 16.6668ZM25.333 21.3335C26.0663 21.3335 26.6663 20.7335 26.6663 20.0002C26.6663 19.2668 26.0663 18.6668 25.333 18.6668C24.5997 18.6668 23.9997 19.2668 23.9997 20.0002C23.9997 20.7335 24.5997 21.3335 25.333 21.3335ZM25.333 28.6668C24.2263 28.6668 23.333 29.5602 23.333 30.6668C23.333 31.7735 24.2263 32.6668 25.333 32.6668C26.4397 32.6668 27.333 31.7735 27.333 30.6668C27.333 29.5602 26.4397 28.6668 25.333 28.6668ZM35.9997 29.3335C35.2663 29.3335 34.6663 29.9335 34.6663 30.6668C34.6663 31.4002 35.2663 32.0002 35.9997 32.0002C36.733 32.0002 37.333 31.4002 37.333 30.6668C37.333 29.9335 36.733 29.3335 35.9997 29.3335ZM35.9997 34.6668C35.2663 34.6668 34.6663 35.2668 34.6663 36.0002C34.6663 36.7335 35.2663 37.3335 35.9997 37.3335C36.733 37.3335 37.333 36.7335 37.333 36.0002C37.333 35.2668 36.733 34.6668 35.9997 34.6668ZM35.9997 24.0002C35.2663 24.0002 34.6663 24.6002 34.6663 25.3335C34.6663 26.0668 35.2663 26.6668 35.9997 26.6668C36.733 26.6668 37.333 26.0668 37.333 25.3335C37.333 24.6002 36.733 24.0002 35.9997 24.0002ZM35.9997 18.6668C35.2663 18.6668 34.6663 19.2668 34.6663 20.0002C34.6663 20.7335 35.2663 21.3335 35.9997 21.3335C36.733 21.3335 37.333 20.7335 37.333 20.0002C37.333 19.2668 36.733 18.6668 35.9997 18.6668ZM39.9997 30.0002C39.6263 30.0002 39.333 30.2935 39.333 30.6668C39.333 31.0402 39.6263 31.3335 39.9997 31.3335C40.373 31.3335 40.6663 31.0402 40.6663 30.6668C40.6663 30.2935 40.373 30.0002 39.9997 30.0002ZM30.6663 34.6668C29.933 34.6668 29.333 35.2668 29.333 36.0002C29.333 36.7335 29.933 37.3335 30.6663 37.3335C31.3997 37.3335 31.9997 36.7335 31.9997 36.0002C31.9997 35.2668 31.3997 34.6668 30.6663 34.6668ZM30.6663 39.3335C30.293 39.3335 29.9997 39.6268 29.9997 40.0002C29.9997 40.3735 30.293 40.6668 30.6663 40.6668C31.0397 40.6668 31.333 40.3735 31.333 40.0002C31.333 39.6268 31.0397 39.3335 30.6663 39.3335ZM25.333 23.3335C24.2263 23.3335 23.333 24.2268 23.333 25.3335C23.333 26.4402 24.2263 27.3335 25.333 27.3335C26.4397 27.3335 27.333 26.4402 27.333 25.3335C27.333 24.2268 26.4397 23.3335 25.333 23.3335ZM25.333 34.6668C24.5997 34.6668 23.9997 35.2668 23.9997 36.0002C23.9997 36.7335 24.5997 37.3335 25.333 37.3335C26.0663 37.3335 26.6663 36.7335 26.6663 36.0002C26.6663 35.2668 26.0663 34.6668 25.333 34.6668ZM30.6663 28.6668C29.5597 28.6668 28.6663 29.5602 28.6663 30.6668C28.6663 31.7735 29.5597 32.6668 30.6663 32.6668C31.773 32.6668 32.6663 31.7735 32.6663 30.6668C32.6663 29.5602 31.773 28.6668 30.6663 28.6668ZM30.6663 23.3335C29.5597 23.3335 28.6663 24.2268 28.6663 25.3335C28.6663 26.4402 29.5597 27.3335 30.6663 27.3335C31.773 27.3335 32.6663 26.4402 32.6663 25.3335C32.6663 24.2268 31.773 23.3335 30.6663 23.3335Z"
              fill="#969696"
            />
          </svg>

          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{user.name}.</h2>
          </div>
        </header>
        <div className="dropdownSection">
          <header> Main Menu</header>
          <ul>
            <li>
              <NavlinkStyled to="/">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.78005 3.87868C1.90137 4.75736 1.90137 6.17157 1.90137 9V15C1.90137 17.8284 1.90137 19.2426 2.78005 20.1213C3.65873 21 5.07294 21 7.90137 21H13.3397C16.1681 21 17.5823 21 18.461 20.1213C19.3397 19.2426 19.3397 17.8284 19.3397 15V9C19.3397 6.17157 19.3397 4.75736 18.461 3.87868C17.5823 3 16.1681 3 13.3397 3H7.90137C5.07294 3 3.65873 3 2.78005 3.87868ZM14.1082 8C14.6605 8 15.1082 8.44772 15.1082 9V17C15.1082 17.5523 14.6605 18 14.1082 18C13.5559 18 13.1082 17.5523 13.1082 17V9C13.1082 8.44772 13.5559 8 14.1082 8ZM8.13287 11C8.13287 10.4477 7.68515 10 7.13287 10C6.58058 10 6.13287 10.4477 6.13287 11L6.13287 17C6.13287 17.5523 6.58058 18 7.13287 18C7.68515 18 8.13287 17.5523 8.13287 17L8.13287 11ZM11.6205 13C11.6205 12.4477 11.1728 12 10.6205 12C10.0682 12 9.6205 12.4477 9.6205 13V17C9.6205 17.5523 10.0682 18 10.6205 18C11.1728 18 11.6205 17.5523 11.6205 17V13Z"
                    fill="white"
                  />
                </svg>
                <span>DashBoard</span>
              </NavlinkStyled>
            </li>
          </ul>
        </div>
      </div>
    </NavStyles>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/create-transaction" element={<CreateTransaction />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default function AuthenticatedApp({ user }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <AuthenticatedAppStyles>
      <div className="mobile-layout-trigger" onClick={() => setShowModal(!showModal)}>
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
        </svg>
        <Dialog isOpen={showModal}>
          <NavModal>
            <Nav user={user} />
          </NavModal>
        </Dialog>
      </div>
      <Nav user={user} />
      <AppRoutes />
    </AuthenticatedAppStyles>
  );
}
