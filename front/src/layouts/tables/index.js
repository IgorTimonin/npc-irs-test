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
import Preloader from "Preloader/Preloader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MDButton from "components/MDButton";

function Tables() {
  // колонки таблицы "покупатели"
  const [customersColumns] = useState([
    {
      field: "id",
      maxWidth: 100,
    },
    {
      field: "name",
      editable: true,
    },
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
  const [isLoading, setIsLoading] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [onAdding, setOnAdding] = useState(false);

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

  // AgGrid options
  const gridRef = useRef(); // доступ к AGGrid API

  // общие настройки для всех колонок
  const defaultColDef = useMemo(() => ({
    sortable: true,
    editable: false,
    resizable: true,
    flex: 1,
    minWidth: 30,
  }));

  // обновление данных таблицы
  async function rowsRerender(callback) {
    await callback();
    gridRef.current.api.refreshCells();
    setIsLoading(false);
  }
  // действия при начале редактирования строки
  const onRowEditingStarted = () => {
    setOnEdit(true);
  };
  // действия при окончании редактирования строки
  const onRowEditingStopped = () => {
    setOnEdit(false);
    setOnAdding(false);
    rowsRerender(getCustomersData);
  };

  // добавление новой строки и фокусировка для редактирования
  async function addNewRow() {
    setOnAdding(true);
    const { api } = gridRef.current;
    await api.applyTransaction({ add: [{}], addIndex: 0 });
    api.setFocusedCell(0, "id");
    api.startEditingCell({
      rowIndex: 0,
      colKey: "id",
    });
  }
  // сохранение новой строки в БД и отрисовка обновлённых данных
  const saveNewRow = () => {
    setOnAdding(false);
    const { api } = gridRef.current;
    api.stopEditing();
    const selectedRow = api.getSelectedNodes();
    setIsLoading(true);
    mainApi.addCustomer(selectedRow[0].data).then(() => {
      rowsRerender(getCustomersData)
        .then(() => setOnEdit(false))
        .catch((err) => {
          console.log(err);
        });
    });
  };
  // редактирование строки
  const editRow = useCallback(() => {
    const { api } = gridRef.current;
    const selectedRow = api.getSelectedNodes();
    if (selectedRow.length > 0) {
      api.setFocusedCell(selectedRow[0].rowIndex, "id");
      api.startEditingCell({
        rowIndex: selectedRow[0].rowIndex,
        colKey: "id",
      });
    } else console.log("He выбрана строка для редактирования");
  }, []);
  // обновление данных строки
  const updateRow = () => {
    const { api } = gridRef.current;
    api.stopEditing();
    const selectedRow = api.getSelectedNodes();
    setIsLoading(true);
    mainApi.updateCustomer(selectedRow[0].data).then(() => {
      rowsRerender(getCustomersData)
        .then(() => setOnEdit(false))
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // удаление покупателя
  const deleteRow = () => {
    const selectedRow = gridRef.current.api.getSelectedNodes();
    setIsLoading(true);
    mainApi.deleteCustomer(selectedRow[0].data.id).then(() => {
      rowsRerender(getCustomersData).catch((err) => {
        console.log(err);
      });
    });
  };

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
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={addNewRow}
                  disabled={onAdding}
                >
                  Добавить запись
                </MDButton>
                {/* )} */}
                {onEdit ? (
                  <MDButton
                    sx={{ m: "0.5rem" }}
                    size="small"
                    variant="gradient"
                    color="warning"
                    onClick={() => {
                      if (onAdding) {
                        saveNewRow();
                      } else updateRow();
                    }}
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
