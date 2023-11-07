import icon from "../../assets/ikona.svg";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
const Homepage = () => {
  return (
    <>
      <Box
        component="img"
        src={icon}
        alt="ikona aplikacji"
        sx={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "192px"
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
        Witaj!
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        }}
      >
        <p>
          Aplikacja Budget Master umożliwia użytkownikom łatwe i szybkie
          dodawanie swoich codziennych przychodów i wydatków. Możesz wprowadzać
          transakcje ręcznie lub korzystać z funkcji automatycznego sczytywania
          paragonów. To znacznie upraszcza proces śledzenia wszystkich
          finansowych operacji.
        </p>
        <p>
          Dzięki zaawansowanej technologii rozpoznawania tekstu, aplikacja
          pozwala użytkownikom zeskanować paragon za zakupy, a następnie
          automatycznie wydobywa z niego informacje o kwocie transakcji.
        </p>
        <p>
          Możesz przypisywać każdą transakcję do odpowiedniej kategorii, co
          ułatwia analizę i monitorowanie wydatków. Aplikacja oferuje gotowe
          kategorie, ale również umożliwia tworzenie własnych, dostosowanych do
          Twoich potrzeb. Dzięki temu masz pełną kontrolę nad swoimi finansami.
        </p>
        <p>
          Aplikacja "BudgetMaster" przechowuje pełną historię transakcji, co
          pozwala użytkownikom monitorować swoje finanse w czasie. Możesz
          przeglądać transakcje według daty, kategorii lub źródła
          przychodu/wydatku, co ułatwia analizę i planowanie budżetu.
        </p>
      </Typography>
    </>
  );
};

export default Homepage;
