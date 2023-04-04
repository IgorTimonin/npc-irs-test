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

  getCustomersData() {
    return fetch(`${this.apiPath}customers/`, {
      method: "GET",
      headers: this.headers,
    }).then(resultHandler);
  }

  addCustomer(customerData) {
    return fetch(this.apiPath, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(customerData),
    }).then(resultHandler);
  }

  updateCustomer(customerData) {
    return fetch(this.apiPath, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(customerData),
    }).then(resultHandler);
  }

  deleteCustomer(Id) {
    return fetch(`${this.apiPath}${Id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(resultHandler);
  }
}

export const mainApi = new Api(apiAddress, {});
