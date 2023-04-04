// import { useEffect } from "react";
// import { mainApi } from "../../../utils/Api";

// export default function Data() {
// const [isLoading, setIsLoading] = useState(false);
// const [message, setMessage] = useState("");
// const [customersList, setCustomersList] = useState([]);

//   function getCustomersFromDB() {
//     mainApi
//       .getCustomersData()
//       .then((data) => {
//         // setCustomersList(data);
//         // setIsLoading(false);
//       })
//       .catch((err) => {
//         // setMessage(
//         //   "Bo время запроса произошла ошибка. Возможно, проблема c соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
//         // );
//         console.log(err);
//       });
//   }
//   // return customersList;
//   useEffect(() => {
//     getCustomersFromDB();
//   }, []);
// }
