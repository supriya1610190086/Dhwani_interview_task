const db = require("../create_databases")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { post } = require("../routes/router");

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "Nav@gur1",
        database: "Backend"
    },
});

create_User = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10).then((hash) => {
        knex("registration").insert({
                username: user.username,
                password: hash
            })
            .then((result) => {
                res.send({ sucess: result })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
    })
}

login_User = (req, res) => {
    const user = req.body;
    knex.from("registration").select("*").where("username", user.username)
        .then((data) => {
            if (data.length > 0) {
                for (d of data)
                    userPassword = d['password']
                const verified = bcrypt.compareSync(user.password, userPassword.toString());
                if (verified) {
                    jwt.sign({ username: user.username, id: d.id }, "thisissecretkey", (err, token) => {
                        if (token) {
                            res.json({ message: "Loged in", token: token })
                        }
                    })
                } else {
                    res.send("password is not correct")
                }
            } else {
                res.status(403).send("user doen't exists")
            }
        })
}

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decoded = jwt.decode(bearerToken);
        req.data = decoded
        next();
    } else {
        res.status(403).send("user is not authenticated")
    }
}


create_state = (req, res) => {
    newdata = req.body
    jwt.verify(req.token, 'thisissecretkey', (err, authData) => {
        if (authData) {
            knex("state").insert({
                    id: authData.id,
                    state_name: newdata.state_name
                })
                .then((result) => {
                    console.log(result);
                    res.send({ sucess: "your state is succesfuly inserted." })
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).send({ error: err })
                    }
                })

        } else {
            res.send({
                err: "you have already stae is defined"
            });
        }
    })
}

get_All_create_state = (req, res) => {
    knex.from('state').select("*")
        .then((rows) => {
            res.send(rows)
        })
}

create_District = (req, res) => {
    newdata = req.body
    jwt.verify(req.token, 'thisissecretkey', (err, authData) => {
        if (authData) {
            knex("District").insert({
                    state_id: newdata.state_id,
                    id: authData.id,
                    District_name: newdata.District_name
                })
                .then((result) => {
                    res.send({ sucess: "your District is succesfuly inserted." })
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).send({ error: err })
                    }
                })

        } else {
            console.log(err);
        }
    })
}

get_All_create_District = (req, res) => {
    knex.from('District').select("*")
        .then((rows) => {
            res.send(rows)
        })
}

create_childs = (req, res) => {
    newdata = req.body
    jwt.verify(req.token, 'thisissecretkey', (err, authData) => {
        if (authData) {
            knex("childs").insert({
                    Name: newdata.Name,
                    Sex: newdata.Sex,
                    DOB: newdata.DOB,
                    Father_name: newdata.Father_name,
                    Mother_name: newdata.Mother_name,
                    state_id: req.body.state_id,
                    District_id: req.body.District_id
                })
                .then((result) => {
                    console.log(result);
                    res.send({ sucess: "your child post is succesfuly inserted." })
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).send({ error: err })
                    }
                })

        } else {
            console.log(err);
        }
    })
}
get_All_create_childs = (req, res) => {
    knex.from('childs').select("*")
        .then((rows) => {
            res.send(rows)
        })
}

module.exports = {
    create_User,
    login_User,
    verifyToken,
    create_state,
    create_District,
    get_All_create_state,
    get_All_create_District,
    create_childs,
    get_All_create_childs
}