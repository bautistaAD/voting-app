import {addMember, importCSV, getAllMembers, editMember, deleteMember, getMemberIdByName} from "./controllers/admin-mem-controller.js";
import {login, checkIfLoggedIn} from "./controllers/login-auth-controller.js";
import { changePassword } from "./controllers/admin-account-controller.js";
import { addElection, getElections, getElectionById, addPosition, getPositions,editElection} from "./controllers/admin-election-controller.js";
import { addCandidate, upload, getCandidates, getMembersNotCandidate} from "./controllers/admin-candidates-controller.js";
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
  app.post("/delete-member", deleteMember);
  app.post("/edit-member", editMember);

  app.post("/add-election", addElection);
  app.get("/get-elections", getElections);
  app.get("/get-election-by-id", getElectionById);
  app.post("/add-position", addPosition);
  app.post("/get-positions", getPositions);
  app.post("/edit-election", editElection);

  app.post("/add-candidate", upload.single("gpoa"), addCandidate);
  app.post("/get-mem-id-by-name", getMemberIdByName);
  app.get("/get-candidates", getCandidates);
  app.post("/get-members-not-candidate", getMembersNotCandidate);
}

export default setUpRoutes;