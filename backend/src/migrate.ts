import fs from "fs";
import db from "./database/database";
import { exit } from "process";

console.log("Database migration started!");
fs.readFile("dist/database/init.sql", "utf8", function (err, data) {
  if (err) throw err;
  db.query(data, function (err, result) {
    if (err) throw err;
    if (result) {
      console.log("Database migration completed!");
    }
    exit();
  });
});
