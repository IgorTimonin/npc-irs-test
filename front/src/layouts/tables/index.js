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
// eslint-disable-next-line import/extensions

function Tables() {
  // колонки таблицы "покупатели"
  const [customersColumns] = useState([
    { field: "id", maxWidth: 100 },
    { field: "name", editable: true },
    { field: "surname", editable: true },
    { field: "email", editable: true },
    { field: "balance", editable: true },
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
  const [customersList, setCustomersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  // const [selectedRowId, setSelectedRowId] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  // получение данных из БД:
  // о покупателях
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
    editable: false,
    resizable: true,
    flex: 1,
    minWidth: 30,
  }));

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback((event) => {
  //   selectedRowID = event.data.id;
  // }, []);

  // сохраняем id строки в переменную
  // const clickedRowIdListener = useCallback((e) => {
  //   // selectedRowID = event.data.id;
  //   // setSelectedRowId(e.data.id);
  // }, []);

  const onRowEditingStarted = useCallback(() => {
    setOnEdit(true);
    // console.log("начато редактирование");
  }, []);

  const onRowEditingStopped = useCallback(() => {
    setOnEdit(false);
    // console.log("редактирование закончено");
  }, []);

  // обновление данных таблицы
  async function rowRerender(callback) {
    await callback();
    gridRef.current.api.refreshCells();
  }

  // удаление покупателя
  const deleteRow = () => {
    const selectedRow = gridRef.current.api.getSelectedNodes();
    mainApi.deleteCustomer(selectedRow[0].data.id).then(() => {
      rowRerender(getCustomersData).catch((err) => {
        console.log(err);
      });
    });
  };

  const editRow = useCallback(() => {
    const { api } = gridRef.current;
    const selectedRow = api.getSelectedNodes();
    api.setFocusedCell(selectedRow[0].rowIndex, "id");
    api.startEditingCell({
      rowIndex: selectedRow[0].rowIndex,
      colKey: "id",
    });
  }, []);

  const updateRow = () => {
    const selectedRow = gridRef.current.api.getSelectedNodes();
    mainApi.updateCustomer(selectedRow[0].data).then(() => {
      rowRerender(getCustomersData).catch((err) => {
        console.log(err);
      });
    });
  };

  // const saveRow = () => {};

  const addRow = () => {
    rowRerender(getCustomersData);
  };
  // useEffect(() => {
  //   console.log(selectedRowId);
  // }, [selectedRowId]);

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
                  onClick={addRow}
                >
                  Добавить запись
                </MDButton>
                {onEdit ? (
                  <MDButton
                    sx={{ m: "0.5rem" }}
                    size="small"
                    variant="gradient"
                    color="warning"
                    onClick={updateRow}
                  >
                    сохранить
                  </MDButton>
                ) : (
                  <MDButton
                    sx={{ m: "0.5rem" }}
                    size="small"
                    variant="gradient"
                    color="secondary"
                    onClick={editRow}
                  >
                    изменить
                  </MDButton>
                )}
                <MDButton size="small" variant="gradient" color="error" onClick={deleteRow}>
                  удалить
                </MDButton>
                <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                  <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={customersList} // Row Data for Rows
                    columnDefs={customersColumns} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    editType="fullRow"
                    suppressClickEdit
                    animateRows // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="single" // Options - allows click selection of rows
                    onRowEditingStarted={onRowEditingStarted}
                    onRowEditingStopped={onRowEditingStopped}
                    // onCellClicked={clickedRowIdListener} // Optional - registering for Grid Event
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
                    // ref={gridRef} // Ref for accessing Grid's API
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
