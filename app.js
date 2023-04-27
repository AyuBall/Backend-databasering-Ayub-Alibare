var mysql = require("mysql");
const express = require("express")
const app = express()
const port = 3000

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ayub2023",
    database: "uppgift"
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get("/", (req, res) => {
    con.query(
        "SELECT * FROM artist",
        (err, result) => {
            if (err) throw err;
            res.send(result)
        }
    )

    // con.query(
    //     "SELECT * FROM songs",
    //     (err, result) => {
    //         if (err) throw err;
    //         res.send(result)
    //     }
    // )

    // con.query(
    //     "SELECT * FROM album",
    //     (err, result) => {
    //         if (err) throw err;
    //         res.send(result)
    //     }
    // )
})

app.get("/insert", (req, res) => {
    //http://localhost:3000/insert?stagename=Sniper&firstname=Ayub&surname=Alibare&age=23
    con.query(
        `INSERT INTO artist VALUES(
            '${req.query.stagename}',
            '${req.query.firstname}',
            '${req.query.surname}',
            '${req.query.age}'
        )`,
        (err, result) => {
            if (err) throw err;
            res.send(`Artist has been added`)
        }
    )
})

app.get("/update", (req, res) => {
    //localhost:3000/update?stagename=abc
    con.query(
        `UPDATE artist SET stagename='${req.query.stagename}' WHERE firstname = 'Ayub'`,
        (err, result) => {
            if (err) throw err;
            res.send("Artist updated")
        }
    )
})

app.get("/delete", (req, res) => {
    con.query(
        `DELETE FROM artist WHERE firstname = 'Ayub'`,
        (err, result) => {
            if (err) throw err;
            res.send("Artist deleted")
        }
    )
})


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!")
})