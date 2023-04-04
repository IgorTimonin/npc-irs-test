// import { mainApi } from "../../../utils/Api";

// export default function Data() {
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [message, setMessage] = useState("");
//   const [ordersList, setOrdersList] = useState([]);

//   function getOrdersFromDB() {
//     mainApi
//       .getOrdersData()
//       .then((data) => {
//         setOrdersList(data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         // setMessage(
//         //   "Bo время запроса произошла ошибка. Возможно, проблема c соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
//         // );
//         console.log(err);
//       });
//   }
//   return ordersList;
// }
