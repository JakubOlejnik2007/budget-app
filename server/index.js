const express = require("express");
const config = require("./config");
const cors = require("cors");
require("./db/db_config");

const app = express();

const test = require("./db/helpers/register");
const register = require("./db/helpers/register");
const login = require("./db/helpers/login");
const fs = require("fs");
const path = require("path");
const { getBudgetsList, createBudget, deleteBudget } = require("./db/helpers/manage-budget");
const { addEntry, getEntry, getEntriesForWeek } = require("./db/helpers/entries");
const { getCategories } = require("./db/helpers/categories");
const multer = require("multer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/find", test);
app.get("/categories", getCategories);
app.post("/register", register);
app.post("/login", login);

// Private routes (Remember to add auththentication middleware)

app.get("/budgets", getBudgetsList);
app.post("/budgets", createBudget);
app.delete("/budgets", deleteBudget);


const storage = multer.diskStorage({
    destination: "uploads/", // Katalog docelowy
    filename: (req, file, callback) => {
        const extname = path.extname(file.originalname);
        const filename = `${Date.now()}.png`; // Nowa nazwa pliku
        callback(null, filename);

        // Przechowaj nazwę pliku w zmiennej
        req.uploadedFileName = filename;
    },
});

const upload = multer({ storage: storage });

const ReadText = require("text-from-image");
const sharp = require("sharp");
const sharpImage = (name, targetWidth = 500) => {
    // Odczytaj wejściowy plik i przeskaluj go
    sharp(`uploads/${name}`)
        .resize(targetWidth) // Przeskaluj do szerokości 500 pikseli, zachowując proporcje
        .toFile(`uploads/res${name}`, (err, info) => {
            if (err) {
                console.error("Błąd:", err);
            } else {
                console.log("Przeskalowano obraz:", info);
            }
        });
};

const read = async (name) =>
    ReadText(`uploads/res${name}`)
        .then((text) => {
            return text;
        })
        .catch((err) => {
            console.log(err);
        });

app.post("/image", upload.single("file"), async (req, res) => {
    // Sprawdź, czy nazwa pliku jest dostępna w zmiennej req.uploadedFileName
    if (req.uploadedFileName) {
        console.log("Plik został pomyślnie przesłany:", req.uploadedFileName);

        sharpImage(req.uploadedFileName);
        const text = await read(req.uploadedFileName);
        const lines = text.split("\n");

        // Znajdź linię zawierającą słowo "SUMA"
        const sumaLine = lines.find((line) => line.includes("SUMA"));

        if (sumaLine) {
            const amount = sumaLine.split(" ")[sumaLine.split(" ").length - 1];
            res.status(200).send({
                name: req.uploadedFileName,
                value: amount,
            });
            return;
        }
    }
    res.status(400).send("Błąd: Plik nie został przesłany.");
});

app.post("/entries", addEntry);
app.get("/entries", getEntry);
app.get("/entries-weekly", getEntriesForWeek);
app.listen(config.express.port, () => {
    console.log(`Server running on port ${config.express.port}`);
});
