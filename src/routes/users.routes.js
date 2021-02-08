const { Router } = require("express");
const router = Router();

const { 
    renderSignIn,
    signIn,
    logOut
} = require("../controllers/users.controller");

// router.get("/dashboard/registro", renderSignUp);

// router.post("/dashboard/registro", signUp);

router.get("/dashboard/login", renderSignIn);

router.post("/dashboard/login", signIn);

router.get("/dashboard/logout", logOut);

module.exports = router;