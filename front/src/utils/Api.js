/* eslint-disable no-console */
export const resultHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const apiAddress = "http://localhost:4001/";

class Api {
  constructor(apiPath) {
    this.apiPath = apiPath;
    this.headers = { "Content-Type": "application/json" };
  }

  getOrdersData() {
    return fetch(`${this.apiPath}orders/`, {
      method: "GET",
      headers: this.headers,
    }).then(resultHandler);
  }

  getCustomersData(page) {
    return fetch(`${this.apiPath}customers${page ? `?page=${page}` : ""}`, {
      method: "GET",
      headers: this.headers,
    }).then(resultHandler);
  }

  addCustomer(customerData) {
    return fetch(`${this.apiPath}customers/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(customerData),
    }).then(resultHandler);
  }

  updateCustomer(customerData) {
    return fetch(`${this.apiPath}customers/${customerData.id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: customerData.name,
        surname: customerData.surname,
        email: customerData.email,
        balance: customerData.balance,
      }),
    }).then(resultHandler);
  }

  deleteCustomer(id) {
    return fetch(`${this.apiPath}customers/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.text().then((text) => {
          console.log(text);
        });
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

export const mainApi = new Api(apiAddress, {});
