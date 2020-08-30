const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aditya',
    database: 'ticketBooking'
})

function createTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
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
            `SELECT username, mobilenumber, timing FROM tickets WHERE timing=?`,
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

function addtickets (username, mobilenumber, timing, status) {

    return new Promise(function (resolve, reject) {
        connection.query(
            `INSERT INTO tickets (task) VALUES (?)`,
            [username, mobilenumber, timing, status],
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function updatetickettiming (ticketid, newTiming) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET timing=? WHERE id=?`,
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
            `DELETE FROM tickets WHERE id=?`,
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
            `SELECT username, mobilenumber FROM tickets WHERE id=?`,
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