import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// CleanURI API for shortening user's URL
const API_URL = "https://cleanuri.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    shorturl: "Waiting for URL...",
  });
});

app.post("/", async (req, res) => {
  //Getting user's URL
  const mainurl = req.body.url;
  try {
    //Using API to get the result(shortened) URL
    const result = await axios.post(`${API_URL}/api/v1/shorten`, {
      url: mainurl,
    });
    res.render("index.ejs", {
      shorturl: result.data.result_url,
    });
  } catch (error) {
    //Handling error
    res.render("index.ejs", {
      shorturl: "Incorrect URL",
    });
    console.log(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
