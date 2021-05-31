const {Client} = require('pg');

const connection = 'postgressql://postgres:root@localhost:5432/logreg'

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database:  'logreg'
})

client.connect()

client.query('SELECT * FROM users', (err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    client.end()
})