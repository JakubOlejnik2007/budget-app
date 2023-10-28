const ReadText = require("text-from-image");
const sharp = require('sharp');
const sharpImage = (num, targetWidth = 500) => {

    // Odczytaj wejściowy plik i przeskaluj go
    sharp(`img/image${num}.jpg`)
        .resize(targetWidth) // Przeskaluj do szerokości 500 pikseli, zachowując proporcje
        .toFile(`img/image${num+10}.jpg`, (err, info) => {
            if (err) {
                console.error("Błąd:", err);
            } else {
                console.log("Przeskalowano obraz:", info);
            }
        });
};

const read = async (path) =>
    ReadText(path)
        .then((text) => {
            console.log(text, "\n\n\n\n\n\n");
        })
        .catch((err) => {
            console.log(err);
        });
sharpImage(19)
read("img/image29.jpg");
