import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

//TODO: Aggiungere midleware per vedere i log delle api in entrata per fare il 4 punto
app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.get("/api", (req, res) => {
  const date_string = new Date();
  res.status(200).json({
    unix: date_string.getTime(),
    utc: date_string.toUTCString(),
  });
});

//2016-12-25
///api/1451001600000
//05%20October%202011
//this-is-not-a-date
app.get("/api{/:date}", (req, res) => {
  try {
    // const regex = /[^0-9][A-Za-z]?\-?/g;
    const regex = /[^0-9]/g;
    console.log(req.params.date.search(regex) === -1 ? "La data è un numero" : "La data è una stringa");
    const reqDate = req.params.date.search(regex) === -1 ? Number(req.params.date) : req.params.date;
    // console.log(reqDate);
    const date_string = new Date(reqDate);

    if (Number.isNaN(date_string.getTime())) {
      console.log("Non è una data valida");
      res.json({
        error: "Invalid date",
      });
      return;
    }

    // console.log(date);
    // const date = new Date(`${req.params.date}`);

    res.status(200).json({
      unix: date_string.getTime(),
      utc: date_string.toUTCString(),
    });
  } catch (error) {
    console.log(error);
  }
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
