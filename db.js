const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aditya',
    database: 'ticketBooking',
    password: 'adityauser'
})

function createTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS tickets (
                ticketid INTEGER AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100),
                mobilenumber INTEGER,
                timing TIME,
                status VARCHAR(10))`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve("Table Created Successfully")
                }
            }
        )
    })
}

function gettickets () {

    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT * FROM tickets`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function getticketsbytiming (movieTiming) {

    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT ticketid, username, mobilenumber, timing, status FROM tickets WHERE timing=?`,
            [movieTiming],
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function addtickets (newusername, newmobilenumber, newtiming, newstatus) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `INSERT INTO tickets (username, mobilenumber, timing, status) VALUES (?, ?, ?, ?)`,
            [newusername, newmobilenumber, newtiming, newstatus],
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function updatetickettiming (ticketid, newTiming) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET timing=? WHERE ticketid=?`,
            [newTiming, ticketid],
            function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function deleteticket (ticketid) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `DELETE FROM tickets WHERE ticketid=?`,
            [ticketid],
            function (err, results) {
                if (err) {  
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function userdetails (ticketid) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT username, mobilenumber FROM tickets WHERE ticketid=?`,
            [ticketid],
            function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function updatestatus (newstatus, timediff) {
    return new Preomise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET status=? WHERE TIMEDIFF(CURRENT_TIME(), timing) > ?`,
            [newstatus, timediff],
            function (err, resolve) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

exports = module.exports = {
    createTable,
    gettickets,
    getticketsbytiming,
    addtickets,
    updatetickettiming,
    updatestatus,
    deleteticket,
    userdetails
}