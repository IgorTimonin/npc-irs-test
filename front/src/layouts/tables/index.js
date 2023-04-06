/* eslint-disable import/no-unresolved */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { mainApi } from "utils/Api";
// import { useLocation } from "react-router-dom";
import Preloader from "Preloader/Preloader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MDButton from "components/MDButton";

function Tables() {
  // колонки таблицы "покупатели"
  const [customersColumns] = useState([
    { field: "id", maxWidth: 100 },
    { field: "name" },
    { field: "surname" },
    { field: "email" },
    { field: "balance" },
    { field: "creation_date" },
  ]);
  // колонки таблицы "заказы"
  const [ordersColumns] = useState([
    { field: "order_id", maxWidth: 100 },
    { field: "items" },
    { field: "purchase_date" },
    { field: "total_cost" },
    { field: "customer_id" },
  ]);
  // const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  // let selectedRowID = null;
  const [selectedRowId, setSelectedRowId] = useState(null);

  // получение данных из БД:
  // о пользователях
  async function getCustomersData() {
    setIsLoading(true);
    await mainApi
      .getCustomersData()
      .then((data) => setCustomersList(data))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // о заказах
  function getOrdersData() {
    setIsLoading(true);
    mainApi
      .getOrdersData()
      .then((data) => setOrdersList(data))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCustomersData();
    getOrdersData();
  }, []);

  // useEffect(() => {
  //   if (pathname === "/tables") {
  //     if (customersList.length === 0) {
  //       setTimeout(() => {}, 2000);
  //     } else setIsLoading(false);
  //   }
  // }, [customersList]);

  // useEffect(() => {
  //   if (pathname === "/tables") {
  //     if (ordersList.length === 0) {
  //       setTimeout(() => {}, 2000);
  //     } else console.log(ordersList);
  //     setIsLoading(false);
  //   }
  // }, [ordersList]);

  // AgGrid options
  const gridRef = useRef(); // Optional - for accessing Grid's API

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    minWidth: 30,
  }));

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback((event) => {
  //   selectedRowID = event.data.id;
  // }, []);

  // сохраняем id строки в переменную
  const clickedRowIdListener = useCallback((event) => {
    // selectedRowID = event.data.id;
    setSelectedRowId(event.data.id);
  }, []);

  // Example of consuming Grid Event
  const deleteRow = () => {
    // console.log(selectedRowId);
    mainApi.deleteCustomer(selectedRowId);
  };

  useEffect(() => {
    console.log(selectedRowId);
  }, [selectedRowId]);

  // Example using Grid's API
  const buttonListener = useCallback(() => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Preloader isLoading={isLoading} />
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Покупатели
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDButton
                  sx={{ ml: "0.5rem" }}
                  size="small"
                  variant="gradient"
                  color="success"
                  onClick={buttonListener}
                >
                  Добавить запись
                </MDButton>
                <MDButton sx={{ m: "0.5rem" }} size="small" variant="gradient" color="secondary">
                  изменить
                </MDButton>
                <MDButton size="small" variant="gradient" color="error" onClick={deleteRow}>
                  удалить
                </MDButton>
                <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                  <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={customersList} // Row Data for Rows
                    columnDefs={customersColumns} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="single" // Options - allows click selection of rows
                    onCellClicked={clickedRowIdListener} // Optional - registering for Grid Event
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Preloader isLoading={isLoading} />
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Заказы
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                  <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={ordersList} // Row Data for Rows
                    columnDefs={ordersColumns} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="multiple" // Options - allows click selection of rows
                    // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
