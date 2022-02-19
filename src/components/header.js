import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/auth-context";

const HeaderStyles = styled.header`
  background: #ffffff;
  box-shadow: 0px 1px 1px #e5f0fe;
  grid-row: 1/2;
  grid-column: 1/2;
  padding-left: 80px;
  padding-right: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #073763;
  }

  @media (min-width: 1300px) {
    grid-column: 2/3;
    padding-left: 30px;
  }
  .right {
    display: flex;
    align-items: center;
    nav {
      display: flex;
      align-items: center;
      background-color: transparent;
      cursor: pointer;
    }
  }
  .logo {
    background: linear-gradient(0deg, rgba(0, 133, 255, 0.1), rgba(0, 133, 255, 0.1)), #ffffff;
    border-radius: 256px;
    width: 32px;
    height: 32px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #0085ff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    margin-right: 8px;
  }

  .name {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #1c1c1c;
    margin-right: 8px;
  }
`;

const DropdownStyles = styled.section`
  width: 200px;
  height: 40px;
  background: #ffffff;
  position: absolute;
  top: 80px;
  right: 10px;
  border: 1px solid #9fc4fb;
  border-radius: 4px;
  padding-left: 10px;

  div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #43536a;
    cursor: pointer;
  }
`;

const Dropdown = () => {
  const { logout } = useAuth();

  return (
    <DropdownStyles>
      <div onClick={logout}>Logout</div>
    </DropdownStyles>
  );
};

const Header = ({ page }) => {
  const { user } = useAuth();
  const [showDropDown, setShowDropDown] = React.useState(false);
  return (
    <HeaderStyles>
      <h1>{page}</h1>
      <div className="right">
        <div className="logo">{user.name?.[0] || user.company?.[0]}</div>
        <nav onClick={() => setShowDropDown(!showDropDown)}>
          <div className="name">{user.name}</div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.41289 11.3815L11.0199 14.9885C11.563 15.5316 12.4404 15.5316 12.9835 14.9885L16.5905 11.3815C17.4679 10.5041 16.8412 9 15.6017 9H8.38776C7.14829 9 6.53552 10.5041 7.41289 11.3815Z" fill="#969696" />
          </svg>
        </nav>

        {showDropDown && <Dropdown />}
      </div>
    </HeaderStyles>
  );
};

export default Header;
