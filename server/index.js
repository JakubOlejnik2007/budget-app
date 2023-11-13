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
const tesseract = require("node-tesseract-ocr"); // Dodaj nową bibliotekę
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/find", test);
app.get("/categories", getCategories);
app.post("/register", register);
app.post("/login", login);

// Private routes (Remember to add authentication middleware)

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

const sharp = require("sharp");
const sharpImage = async (name, targetWidth = 220) => {
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

const Tesseract = require('tesseract.js');

async function recognizeTextFromImage(imagePath) {
  const { data: { text } } = await Tesseract.recognize(
    `uploads/res${imagePath}`,
    'eng', // Język rozpoznawania
  );
  return text;
}

// Wywołanie funkcji


app.post("/image", upload.single("file"), async (req, res) => {
    try {
        // Sprawdź, czy nazwa pliku jest dostępna w zmiennej req.uploadedFileName
        if (req.uploadedFileName) {
            console.log("Plik został pomyślnie przesłany:", req.uploadedFileName);

            await sharpImage(req.uploadedFileName);

            console.log("Przeskalowano")

            const text = await recognizeTextFromImage(req.uploadedFileName);
            console.log(text);
            const lines = text.split("\n");

            // Znajdź linię zawierającą słowo "SUMA"
            const sumaLine = lines.find((line) => line.includes("SUMA"));

            if (sumaLine) {
                const amount = sumaLine.split(" ")[sumaLine.split(" ").length - 1];
                res.send({
                    name: req.uploadedFileName,
                    value: amount,
                });
                return;
            }
        }
        res.sendStatus(400);
    } catch (error) {
        console.error("Błąd podczas przetwarzania obrazu:", error);
        res.sendStatus(500); // lub inny kod błędu HTTP, który uznasz za odpowiedni
    }
});

app.post("/entries", addEntry);
app.get("/entries", getEntry);
app.get("/entries-weekly", getEntriesForWeek);

app.listen(config.express.port, () => {
    console.log(`Server running on port ${config.express.port}`);
});
