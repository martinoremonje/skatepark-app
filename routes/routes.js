import express from "express";
import { addSkater, adminPage, dataPage, deleteSkater, home, login, loginForm, registerForm, stateCheck, updateSkater } from "../controllers/controller.js";

const router = express.Router();

router.get("/", home);
router.get("/login", loginForm);
router.get("/register", registerForm);
router.get("/admin", adminPage);
router.get("/data", dataPage);

router.post("/register", addSkater);
router.post("/login", login);

router.put("/data", updateSkater);

router.delete("/data", deleteSkater);

router.post('/admin', stateCheck);


router.get('*', (req, res) => {
    res.status(404).send('404 - Page not found');
});

export default router;
