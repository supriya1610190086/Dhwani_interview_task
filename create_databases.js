const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nav@gur1",
    database: "Backend"
})

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "DROP TABLE childs";
//     db.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table deleted");
//     });
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE registration(id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(320) NOT NULL ,password VARCHAR(255) NOT NULL)"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE state(state_id INT AUTO_INCREMENT PRIMARY KEY,state_name VARCHAR(320) NOT NULL,id int,foreign key(id) references registration(id))"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE District(District_id INT AUTO_INCREMENT PRIMARY KEY,District_name VARCHAR(320) NOT NULL,state_id INT,id INT,foreign key(state_id) references state(state_id),foreign key(id) references registration(id))"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE childs(child_id INT AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(320) NOT NULL,Sex VARCHAR(320) NOT NULL,DOB VARCHAR(320) NOT NULL,Father_name VARCHAR(320) NOT NULL,Mother_name VARCHAR(320) NOT NULL,District_id INT,foreign key(District_id) references District(District_id),state_id INT,foreign key(state_id) references state(state_id))"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

module.exports = db