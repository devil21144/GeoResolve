const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./database");
const app = express();
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mihirvelaga21144@gmail.com",
    pass: "uhve eoca sagb itfw",
  },
});
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
app.post("/register/citizen", async (req, res) => {
  const number = Math.floor(Math.random() * 999999) + 100000;
  const password = req.body.password;
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(password, salt);
  console.log(req.body);
  try {
    const results = await db.query(
      "SELECT * FROM citizen WHERE username=lower($1)",
      [req.body.username]
    );
    if (results.rows.length === 1) {
      const err = new Error("User already exists");
      throw err;
    }
    await db.query(
      "insert into assigntable values(lower($1),$2,lower($3),$4,$5,$6,$7)",
      [
        req.body.username,
        hashed,
        req.body.email,
        number,
        req.body.phoneno,
        "citizen",
        req.body.age,
      ]
    );
    transport.sendMail({
      from: "'GeoResolve' <mihirvelaga21144@gmail.com>",
      to: req.body.email,
      subject: "OTP Verification",
      text: `Dear ${req.body.username} ,

  Your One-Time Password (OTP) for verification is:

  🔐 OTP: ${number}

  This code is valid for the next 10 minutes. Please do not share this OTP with anyone.

  If you did not request this code, please ignore this message.

  Thank you,
  GeoResolve Team`,
    });
    res.status(200).send({
      message: "successful",
      status: "ok",
    });
  } catch (err) {
    console.log(err);
    console.log(err.statusCode);
    const status = err.statusCode || 500;
    res.status(status).send({
      message: err.message,
      status: "error",
    });
  }
});
app.post("/register/authority", async (req, res) => {
  const number = Math.floor(Math.random() * 999999) + 100000;
  const password = req.body.password;
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(password, salt);
  console.log(req.body);
  try {
    const results = await db.query(
      "SELECT * FROM authority WHERE username=lower($1)",
      [req.body.username]
    );
    if (results.rows.length === 1) {
      const err = new Error("User already exists");
      throw err;
    }
    const results1 = await db.query(
      "SELECT * FROM authorityaccept WHERE username=lower($1)",
      [req.body.username]
    );
    if (results1.rows.length === 1) {
      const err = new Error(
        "User already in registration\nPlease wait until Admin accepts"
      );
      throw err;
    }
    await db.query(
      "insert into assigntable values(lower($1),$2,lower($3),$4,$5,$6,$7,lower($8),lower($9),lower($10))",
      [
        req.body.username,
        hashed,
        req.body.email,
        number,
        req.body.phoneno,
        "authority",
        req.body.age,
        req.body.district,
        req.body.village,
        req.body.role,
      ]
    );
    transport.sendMail({
      from: "'GeoResolve' <mihirvelaga21144@gmail.com>",
      to: req.body.email,
      subject: "OTP Verification",
      text: `Dear ${req.body.username} ,

  Your One-Time Password (OTP) for verification is:

  🔐 OTP: ${number}

  This code is valid for the next 10 minutes. Please do not share this OTP with anyone.

  If you did not request this code, please ignore this message.

  Thank you,
  GeoResolve Team`,
    });
    res.status(200).send({
      message: "successful",
      status: "ok",
    });
  } catch (err) {
    console.log(err);
    console.log(err.statusCode);
    const status = err.statusCode || 500;
    res.status(status).send({
      message: err.message,
      status: "error",
    });
  }
});
app.post("/otp", async (req, res) => {
  try {
    const otp = req.body.otp;
    const username = req.body.username;
    const results = await db.query(
      "select * from assigntable where username=lower($1)",
      [username]
    );
    const resultsRows = results.rows[0];
    console.log(results.rows);
    const otpdb = results.rows[0].otp;
    if (otp === otpdb) {
      if (resultsRows.tableassign === "authority") {
        await db.query(
          "insert into authorityaccept(username,password,email,phoneno,age,district,village,role) values (lower($1),$2,lower($3),$4,$5,$6,$7,$8)",
          [
            resultsRows.username,
            resultsRows.password,
            resultsRows.email,
            resultsRows.phoneno,
            resultsRows.age,
            resultsRows.district,
            resultsRows.village,
            resultsRows.role,
          ]
        );
      } else {
        await db.query(
          `insert into ${resultsRows.tableassign} values(lower($1),$2,lower($3),$4,$5)`,
          [
            resultsRows.username,
            resultsRows.password,
            resultsRows.email,
            resultsRows.phoneno,
            resultsRows.age,
          ]
        );
      }
      await db.query("delete from assigntable where username=lower($1)", [
        req.body.username,
      ]);
      res.status(200).send({
        message: "login successful",
        status: "ok",
      });
    } else {
      const err = new Error("Wrong OTP");
      throw err;
    }
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.statusCode || 500;
    res.status(status).send({
      message: message,
      status: "error",
    });
    console.log(err);
  }
});
app.post("/login/admin", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * from admin where username=lower($1)",
      [req.body.username]
    );
    if (results.rows.length === 0) {
      const error = new Error("No User Found");
      throw error;
    }
    const check = await bcrypt.compare(
      req.body.password,
      results.rows[0].password
    );
    if (check === true) {
      res.status(200).send({
        status: "successful",
        message: "Login Successful",
      });
    } else {
      const error = new Error("Wrong Password");
      throw error;
    }
  } catch (err) {
    console.log(err);
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/login/citizen", async (req, res) => {
  try {
    const results = await db.query(
      "select * from citizen where username=lower($1)",
      [req.body.username]
    );
    if (results.rows.length === 0) {
      const error = new Error("No User Found");
      throw error;
    }
    const check = await bcrypt.compare(
      req.body.password,
      results.rows[0].password
    );
    if (check === true) {
      res.status(200).send({
        status: "successful",
        message: "Login Successful",
      });
    } else {
      const error = new Error("Wrong Password");
      throw error;
    }
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
      message: message,
      status: "error",
    });
    console.log(err);
  }
});
app.post("/login/authority", async (req, res) => {
  try {
    const results = await db.query(
      "select * from authority where username=lower($1)",
      [req.body.username]
    );
    if (results.rows.length === 0) {
      const err = new Error("No User Found");
      throw err;
    }
    const check = await bcrypt.compare(
      req.body.password,
      results.rows[0].password
    );
    if (check) {
      res.status(200).send({
        status: "success",
        message: "login successful",
      });
    } else {
      const err = new Error("Wrong Password");
      throw err;
    }
  } catch (err) {
    console.log(err);
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
      message: message,
      status: "error",
    });
  }
});
app.post("/admin/searchauthority", async (req, res) => {
  try {
    const { district, village, role } = req.body;

    const query = `
      SELECT username, age, email, phoneno, role
      FROM authority
      WHERE 
        ($1::text IS NULL OR $1 = '' OR LOWER(district) = LOWER($1)) AND
        ($2::text IS NULL OR $2 = '' OR LOWER(village) = LOWER($2)) AND
        ($3::text IS NULL OR $3 = '' OR LOWER(role) = LOWER($3))
    `;

    const values = [district || "", village || "", role || ""];

    const results = await db.query(query, values);    
    if (results.rows.length === 0) {
      const err = new Error("No Authority found");
      throw err;
    }
    console.log(results.rows);
    res.status(200).send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send({
      message: err.message || "Internal server error",
      status: "error",
    });
  }
});
app.listen(port, () => {
  console.log(`Server up and listening on ${port}`);
});
