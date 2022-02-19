import React from "react";
import styled from "styled-components";
import { useAuth, useclient } from "../context/auth-context";
import Helmet from "react-helmet";

import PageHeader from "../components/header";
import Select from "react-select";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const CreateTransactionStyled = styled.main`
  form {
    width: 300px;
    button {
      padding: 10px 20px;
      margin-top: 20px;
      background: #081a51;
      color: #fff;
      font-weight: 500;
      width: 100%;
    }
  }
  fieldset {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 10px;
  }
  .label {
    margin-bottom: 10px;
  }
  .select {
    width: 100px;
    basic-single {
      width: 100px;
    }
  }
  input {
    /* height: 80px; */
    border: 1px solid red;
    border-radius: 8px;
    height: 100%;
    padding: 10px;
    border: 1px solid #e4eff5;
    border-radius: 4px;

    &:hover {
      border: 1px solid #0080fe;
    }
  }
`;

export default function CreateTransaction() {
  const { user } = useAuth();
  const [buttonLoadiing, setButtonLoading] = React.useState(false);
  const search = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].value === key) {
        return inputArray[i].usdRate;
      }
    }
  };

  const currenciesOption = user.accounts.map(({ currency: data }) => ({
    value: data._id,
    label: data.code,
    usdRate: data.usdRate,
  }));

  const formik = useFormik({
    initialValues: {
      sourceAmount: 0,
      targetAmount: 0,
      to: undefined,
      sourceCurrency: currenciesOption[0].value,
      targetCurrency: currenciesOption[0].value,
    },
    onSubmit: (values) => {
      setButtonLoading(true);
      useclient("user/create-transaction", {
        data: {
          to: values.to,
          amount: values.targetAmount,
          targetCurrency: values.targetCurrency,
          sourceCurrency: values.sourceCurrency,
        },
      })
        .then((data) => {
          toast(data.message);
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.message);
          setButtonLoading(false);
        });
    },
  });

  const customStyles = {
    control: () => ({
      background: "#fff",
      border: " 1px solid #E4EFF5",
      borderRadius: "4px",
      display: "flex",
      width: 100,
      fontFamily: "Inter",
      fontSize: "14px",
    }),
  };

  const [users, setUser] = React.useState({
    isLoading: true,
    data: [],
  });

  React.useEffect(() => {
    useclient("users").then(({ data }) => {
      setUser({ isLoading: false, data: data.users });
    });
  }, []);

  function heh() {
    const { sourceAmount, sourceCurrency, targetCurrency } = formik.values;
    return (sourceAmount * search(sourceCurrency, currenciesOption)) / search(targetCurrency, currenciesOption);
  }

  React.useEffect(() => {
    formik.setFieldValue("targetAmount", heh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.sourceAmount, formik.values.sourceCurrency, formik.values.targetCurrency]);

  return (
    <>
      <Helmet>
        <title>Create Transaction - Toas</title>
      </Helmet>
      <PageHeader page="Create Transaction" name={user.name} />
      <CreateTransactionStyled>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="label">You send</div>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <input name="sourceAmount" type="number" value={formik.values.sourceAmount} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <div className="select">
                <Select
                  options={currenciesOption}
                  defaultValue={currenciesOption[0]}
                  classNamePrefix="basic"
                  onChange={(data) => {
                    formik.setFieldValue("sourceCurrency", data.value);
                  }}
                  styles={customStyles}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "20px" }}>Exhange Rate * {(search(formik.values.sourceCurrency, currenciesOption) / search(formik.values.targetCurrency, currenciesOption)).toFixed(2)}</div>

          <div className="label">Recipiets get</div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <input name="targetAmount" type="number" value={formik.values.targetAmount} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <div className="select">
              <Select
                options={currenciesOption}
                defaultValue={currenciesOption[0]}
                onChange={(data) => {
                  formik.setFieldValue("targetCurrency", data.value);
                }}
                styles={customStyles}
              />
            </div>
          </div>

          <fieldset>
            <label>Recipiets</label>

            <Select
              options={users.data}
              isLoading={users.isLoading}
              onChange={(data) => {
                formik.setFieldValue("to", data.value);
              }}
            />
          </fieldset>

          <button type="submit">{buttonLoadiing ? "Loading" : "Create Transaction"}</button>
        </form>
      </CreateTransactionStyled>
    </>
  );
}
