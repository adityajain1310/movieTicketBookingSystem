const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aditya',
    database: 'ticketBooking',
    password: 'adityauser'
})

function createticketsTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS tickets (
                ticketid INTEGER AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100),
                mobilenumber VARCHAR(15),
                timing TIME,
                status VARCHAR(10))`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve("Tickets Table Created Successfully")
                }
            }
        )
    })
}

function createshowcountTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS showcount (
                timing TIME,
                total INTEGER)`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve("Show Count Table Created Successfully")
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

function numberofshow (timing) {
    connection.query(
        `SELECT count FROM showcount WHERE timing = ?`,
        [timing],
        function(err, results) {
            if(err) {
                console.error(err)
            } else {
                console.log(results)
                return results
            }
        }
    )
}

function updateshowcountTable() {
    connection.query(
        `INSERT INTO showcount SELECT timing, count(*) as total FROM tickets group by timing`,
        function(err, results) {
            if(err) {
                console.error(err)
            } else {
                console.log(results)
            }
        }
    )
}

function addtickets (newusername, newmobilenumber, newtiming, newstatus) {
    return new Promise(function (resolve, reject) {
        if (numberofshow > 20) {
            reject("Show is Housefull")
        }
        else {
            connection.query(
                `INSERT INTO tickets (username, mobilenumber, timing, status) VALUES (?, CAST(? AS UNSIGNED), ?, ?)`,
                [newusername, newmobilenumber, newtiming, newstatus],
                function (err, results) {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                }
            )
        }
        updateshowcountTable()
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
    return new Promise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET status=? WHERE TIMEDIFF(CURRENT_TIME(), timing) > ?`,
            [newstatus, timediff],
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

function deleteexpiredticket () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `DELETE FROM tickets WHERE status=?`,
            ['expired'],
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

exports = module.exports = {
    createticketsTable,
    createshowcountTable,
    gettickets,
    getticketsbytiming,
    addtickets,
    updatetickettiming,
    updatestatus,
    deleteticket,
    userdetails,
    deleteexpiredticket
}