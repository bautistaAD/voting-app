import {addMember} from "./controllers/admin-mem-controller.js";
import {login, checkIfLoggedIn, userChecker} from "./controllers/login-auth-controller.js";

const setUpRoutes = (app) => {
  //to change
  app.get("/", (req, res) => {
    res.send("API Home");
  });

  app.post("/add-member", addMember);
  app.post("/login", login);
  app.post("/check-if-logged-in", checkIfLoggedIn);

}

export default setUpRoutes;