#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const projectPath = process.cwd();

fs.mkdirSync(`${projectPath}/config`, { recursive: true });
fs.mkdirSync(`${projectPath}/controllers`, { recursive: true });
fs.mkdirSync(`${projectPath}/routes`, { recursive: true });

fs.writeFileSync(`${projectPath}/config/db.js`, `
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nombre-database',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.log('Error');
  } else {
    console.log('OK');
    connection.release();
  }
});

module.exports = promisePool;
`);

fs.writeFileSync(`${projectPath}/server.js`, `
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({
        mensaje:"API"
    });
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);    
});
`);

fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify({
  name: "proyecto-express",
  version: "1.0.0",
  type: "module",
  dependencies: {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "mysql2": "^3.15.3"
  },
  devDependencies: {
    "nodemon": "^3.1.10"
  },
  scripts: {
    start: "nodemon server.js"
  }
}, null, 2));

execSync("npm install", { cwd: projectPath, stdio: "inherit" });

console.log("express/mysql");
