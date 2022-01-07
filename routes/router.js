const express = require('express')
const router = express.Router()
const routes = require('../Controller/user')

router.post("/", routes.create_User)

router.post("/login", routes.login_User)

router.post("/create_state", verifyToken, routes.create_state)

router.get("/get_state", routes.get_All_create_state)

router.post("/create_District", verifyToken, routes.create_District)

router.get("/get_District", routes.get_All_create_District)

router.post("/create_childs", verifyToken, routes.create_childs)

router.get("/get_childs", routes.get_All_create_childs)

module.exports = router