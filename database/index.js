let mysql = require("mysql");
let config = require("./sqlconfig");

async function haeKaikki(sort = "date") {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.server.host,
      user: config.server.user,
      database: config.server.database,
    });
    connection.connect(function (err) {
      if (err) {
        console.log("Virhe yhdistettäessä tietokantaan: " + err);
      }
    });
    let x;
    switch (sort) {
      case "date":
        x = "f.date";
        break;
      case "id":
        x = "f.id";
        break;
      default:
        x = "f.id";
    }

    connection.query(
      `SELECT f.id, f.name, f.date, c.name AS city, 
    (SELECT GROUP_CONCAT(b.name) FROM bands b INNER JOIN connection con ON b.id = con.band_id WHERE con.show_id = f.id) AS bands
    FROM festival f 
    INNER JOIN city c ON f.city_id = c.id 
    GROUP BY ${x}
    `,
      function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      }
    );
    connection.end();
  });
}

async function haeKaikkiArtistit() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.server.host,
      user: config.server.user,
      database: config.server.database,
    });
    connection.connect(function (err) {
      if (err) {
        console.log("Virhe yhdistettäessä tietokantaan: " + err);
      }
    });
    connection.query(
      `SELECT b.id, b.name, b.country_code AS country, bio
    FROM bands b
  
    `,
      function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      }
    );
    connection.end();
  });
}

async function haeArtistilla(artisti) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.server.host,
      user: config.server.user,
      database: config.server.database,
    });
    connection.connect(function (err) {
      if (err) {
        console.log("Virhe yhdistettäessä tietokantaan: " + err);
      }
    });
    connection.query(
      `SELECT DISTINCT f.id, f.name, f.date, c.name AS city, 
    (SELECT GROUP_CONCAT(b.name) FROM bands b INNER JOIN connection con ON b.id = con.band_id WHERE con.show_id = f.id) AS bands
    FROM festival f 
    INNER JOIN city c ON f.city_id = c.id 
    INNER JOIN connection con ON f.id = con.show_id
    INNER JOIN bands b ON con.band_id = b.id
    WHERE b.name LIKE '%' ? '%' 

    `,
      [artisti],
      function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      }
    );
    connection.end();
  });
}

async function haeNimellä(festivaali, sort = "date") {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.server.host,
      user: config.server.user,
      database: config.server.database,
    });
    connection.connect(function (err) {
      if (err) {
        console.log("Virhe yhdistettäessä tietokantaan: " + err);
      }
    });
    let x;
    switch (sort) {
      case "date":
        x = "f.date";
        break;
      case "id":
        x = "f.id";
        break;
      default:
        x = "f.id";
    }

    connection.query(
      `SELECT f.id, f.name, f.date, c.name AS city, 
    (SELECT GROUP_CONCAT(b.name) FROM bands b INNER JOIN connection con ON b.id = con.band_id WHERE con.show_id = f.id) AS bands
    FROM festival f 
    INNER JOIN city c ON f.city_id = c.id 
    WHERE f.name LIKE '%' ? '%'
    GROUP BY ${x}
    `,
      [festivaali],
      function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      }
    );
    connection.end();
  });
}

module.exports = { haeKaikki, haeKaikkiArtistit, haeArtistilla, haeNimellä };
