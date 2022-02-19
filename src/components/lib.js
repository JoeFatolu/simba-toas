import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const spin = keyframes`
	0% { transform: rotate(0deg);}
	100% { transform: rotate(360deg);}
`;

const FieldSet = styled.fieldset`
  width: 100%;
  margin-bottom: 30px;
  @media (min-width: 960px) {
  }
  width: 424px;

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #425466;
    margin-bottom: 9px;
  }
  input {
    background: #edf2f7;
    border-radius: 6px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    /* width: 424px; */
    height: 46px;
    padding-left: 16px;
    width: 100%;

    &:placeholder-shown {
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 15px;
      color: #7a828a;
    }
  }
  .helpertext {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 12px;
    color: #7a7a9d;
    color: ${(props) => {
      return props.error ? "red" : "#7a7a9d";
    }};
    margin-top: 8px;
    width: fit-content;
  }
`;

function Input({ label, id, error, helperText, ...props }) {
  return (
    <FieldSet error={error}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...props} />
      {helperText && <div className="helpertext">{helperText}</div>}
    </FieldSet>
  );
}

const Button = styled.button`
  border-radius: 8px;
  padding: 0;
  width: 100%;
  @media (min-width: 960px) {
  }
  width: 424px;
  height: 46px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: #11426b;
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
`;
const LinkStyled = styled(Link)`
  @media (min-width: 960px) {
  }
  width: 424px;
  height: 26px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .text {
    margin-left: 5px;
  }
`;

const BookListUL = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1em;
`;

// const Spinner = styled(FaSpinner)`
//   animation: ${spin} 1s linear infinite;
// `;

const FullPageSpinnerStyles = styled.div`
  font-size: 4em;
  height: 100vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function FullPageSpinner() {
  return <FullPageSpinnerStyles>{/* <Spinner /> */}</FullPageSpinnerStyles>;
}

function ErrorMessage({ error, variant = "stacked", ...props }) {
  return (
    <div
      role="alert"
      // css={[{ color: colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre>{error.message}</pre>
    </div>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const TableFallbackStyles = styled.tr`
  td {
    height: 232px;
    vertical-align: middle;
    padding: 0 !important;
    width: 100%;
    text-align: center;
  }
`;
function TableFallback({ colspan }) {
  return (
    <tbody>
      <TableFallbackStyles>
        <td colSpan={colspan}>{/* <Spinner /> */}</td>
      </TableFallbackStyles>
    </tbody>
  );
}

function TableErrorFallback({ canReset, error, resetErrorBoundary }) {
  return (
    <tr>
      <div role="alert" style={{ padding: "10px 50px" }}>
        There was an error: <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        {canReset ? <button onClick={resetErrorBoundary}>Try again</button> : null}
      </div>
    </tr>
  );
}

export { FullPageErrorFallback, ErrorMessage, Button, BookListUL, FullPageSpinner, TableFallback, TableErrorFallback, Input, LinkStyled };
