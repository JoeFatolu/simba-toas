import React from "react";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import Icon from "./Icon";

// import { Spinner } from "./lib";

const TableStyled = styled.table`
  background-color: #fff;
  border-radius: 8px;
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e5efff;
  border-radius: 4px 4px 0px 0px;

  .table-time {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    color: #969696;
  }
  .status {
    background: #deffee;
    border-radius: 6px;
    padding: 2px 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 16px;
    color: #66cb9f;
    display: inline-block;
  }
  thead {
    tr {
      height: 50px;
      border-bottom: 1px solid #e5efff;
    }
    th {
      text-align: left;
      margin: auto;
      vertical-align: middle;
      font-weight: 600;
      &:first-child {
        padding-left: 10px;
      }
    }
  }
  tbody {
    width: 100%;
  }
  tr {
    height: 50px;
    width: auto;

    td {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #43536a;
      vertical-align: middle;

      &:first-child {
        padding-left: 10px;
      }
    }

    th {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #43536a;
    }
  }
`;

const EmptyStateStyles = styled.td`
  height: 232px;
  vertical-align: middle;
  padding: 0 !important;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #43536a;
  }
`;

const TableFallbackStyles = styled.tr`
  td {
    height: 232px;
    vertical-align: middle;
    padding: 0 !important;
    width: 100%;
    text-align: center;
  }
`;

export function TableFallback(colSpan = 6) {
  return (
    <tbody>
      <TableFallbackStyles>
        <td colSpan={colSpan}>
          {/* <Spinner />
           */}
          Loading ...
        </td>
      </TableFallbackStyles>
    </tbody>
  );
}

function EmptyState() {
  return (
    <tr>
      <EmptyStateStyles colSpan="6">
        <div>
          <Icon width="52" height="62" id="tableEmptyState" />
          <p> Oops! Nothing here yet</p>
        </div>
      </EmptyStateStyles>
    </tr>
  );
}

function getDateAndTime(new_date) {
  const date = new Date(new_date).toLocaleDateString("en-US").replace(/\//g, ".");
  const time = new Date(new_date).toLocaleTimeString("en-US").replace(/\//g, ".");

  return { date, time };
}

function TableData({ data, userID }) {
  return data.map((tran) => (
    <tr key={tran._id}>
      <td>{tran._id}</td>
      <td>{tran.from._id === userID ? "You" : `${tran.from.firstName} - ${tran.from.lastName}`}</td>
      <td>{tran.to._id === userID ? "You" : `${tran.to.firstName} - ${tran.to.lastName}`}</td>
      <td>{parseInt(tran.from._id === tran.by._id ? tran.amountSent : tran.amountReceived).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      <td>{tran.from._id === tran.by._id ? tran.fromCurrency.code : tran.toCurrency.code}</td>
      <td>
        <div>{getDateAndTime(tran.createdAt).date}</div>
        <div className="table-time">{getDateAndTime(tran.createdAt).time}</div>
      </td>
      <td>
        <div>{getDateAndTime(tran.updatedAt).date}</div>
        <div className="table-time">{getDateAndTime(tran.updatedAt).time}</div>
      </td>
    </tr>
  ));
}

function Tbody({ pokemonResource, userID }) {
  const {
    data: { transactions },
  } = pokemonResource.data.read();

  return <tbody>{!transactions.totalDocs ? <EmptyState /> : <TableData data={transactions.docs} userID={userID} />}</tbody>;
}

export function ErrorFallback({ canReset, error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      {canReset ? <button onClick={resetErrorBoundary}>Try again</button> : null}
    </div>
  );
}

function Table({ pokemonResource, userID }) {
  return (
    <TableStyled>
      <thead>
        <tr>
          <th>ID</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
          <th>Currency</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <ErrorBoundary fallbackRender={(props) => <ErrorFallback {...props} />}>
        <React.Suspense fallback={<TableFallback />}>
          <Tbody pokemonResource={pokemonResource} userID={userID} />
        </React.Suspense>
      </ErrorBoundary>
    </TableStyled>
  );
}

export default Table;
