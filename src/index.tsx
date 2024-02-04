import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./components/app";
import { API_SERVER_URL } from "./public-config";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App initialData={(window as any).initialData} />);

/*//client requesting the webserver for data through api url
axios.get(`${API_SERVER_URL}/contests`).then((response) => {
  console.log(response.data);
  //rendering app when data fetch finishes
  root.render(
    <App initialData={{ contests: response.data.contests }} />,
  );
});*/
