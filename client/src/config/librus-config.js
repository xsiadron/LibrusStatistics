const config = {};

config.serverHostname = "http://localhost";
config.serverPort = 4000;

config.attendaceTypes = {
  1: "Nieobecność",
  2: "Spóźnienie",
  3: "Nieobecność usprawiedliwiona",
  4: "Zwolnienie",
  100: "Obecność",
  2928: "Nieobecność online",
  2930: "Obecność online",
};

config.errors = {
  unknown: "<b>Nieznany błąd.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
  serverNotResponding: "<b>Serwer nie odpowiada.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony."
};

module.exports = config;