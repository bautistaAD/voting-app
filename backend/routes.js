import {addMember, importCSV, getAllMembers} from "./controllers/admin-mem-controller.js";
import {login, checkIfLoggedIn} from "./controllers/login-auth-controller.js";
import { changePassword } from "./controllers/admin-account-controller.js";
const setUpRoutes = (app) => {
  //to change
  app.get("/", (req, res) => {
    res.send("API Home");
  });

  app.post("/login", login);
  app.post("/check-if-logged-in", checkIfLoggedIn);

  app.post("/change-password", changePassword);

  app.post("/add-member", addMember);
  app.post("/import-csv", importCSV);
  app.get("/get-members",getAllMembers);

}

export default setUpRoutes;