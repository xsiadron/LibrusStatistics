const config = {};

config.serverHostname = "http://192.168.1.108";
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

config.messages = {
  loggedOut: "<b>Zostałeś poprawie wylogowany.</b><br/> Twoje dane nie zostały nigdzie przechowane!",
  loading: "<b>Trwa pobieranie danych z serwera...</b><br/> Ten proces powinien trwać 2-10 sekund"
}

module.exports = config;