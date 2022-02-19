import React from "react";
import styled from "styled-components";
import PageHeader from "../components/header";
import { useAuth, useclient } from "../context/auth-context";
import Table from "../components/table";
import { Link } from "react-router-dom";
import { createResource } from "../utils";

const DashboardStyled = styled.main`
  .balance {
    display: flex;
  }
  .balance-card {
    padding: 40px 30px;
    background: white;
    border-radius: 10px;
    width: 330px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    margin-right: 20px;

    .title {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 48px;
      line-height: 60px;
      color: #1c1c1c;
      margin-bottom: 10px;
    }

    /* .balance {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 25px;
      color: #09142e;
    } */
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 20px;
    div:first-child {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */

      /* Black */

      color: #09142e;
    }

    a {
      padding: 15px 20px;
      background: #0c2668;
      border-radius: 5px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #f7f9ff;
    }
  }
`;

export default function DashBoard({ history }) {
  const { user } = useAuth();

  function createPokemonResource() {
    const data = createResource(useclient("user/transactions"));
    return { data };
  }
  const pokemonResource = createPokemonResource();

  return (
    <>
      <PageHeader page="DashBoard" name={user.name} />
      <DashboardStyled>
        <section className="balance">
          {user.accounts.map((data) => (
            <div className="balance-card" key={data._id}>
              <div className="title">
                {data.currency.symbol}
                {parseInt(data.balance).toLocaleString()}
              </div>
              <div className="balance">{data.currency.code} Account Balance</div>
            </div>
          ))}
        </section>
        <section>
          <header>
            <div>Transactions</div>
            <div>
              <Link to="/create-transaction">Create New Transaction</Link>
            </div>
          </header>
          <Table pokemonResource={pokemonResource} userID={user.id} />
        </section>
      </DashboardStyled>
    </>
  );
}
