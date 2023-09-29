import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          MAIN: "MAIN",
          Dashboard: "Dashboard",
          Standorte: "Standorte",
          TicketSystem: "Ticket System",
          Locations: "Locations",
          Pages: "Pages",
          Support: "Support",
          Files: "Files",
          Settings: "Settings",
          Store: "Store",
          completedTask: "Completed Task",
          Calender: "Calender",
          Task: "Task",
          addTask: "Add Task",
        },
      },
      de: {
        translations: {
          MAIN: "MAIN",
          Dashboard: "Armaturenbrett",
          Standorte: "Standorte",
          TicketSystem: "Ticket System",
          Locations: "Locations",
          Pages: "Seiten",
          Support: "Die Unterstützung",
          Files: "Dateien",
          Settings: "Einstellungen",
          Store: "Lager",
          completedTask: "Abgeschlossene Aufgabe",
          Calender: "Kalender",
          Task: "Aufgaben",
          addTask: "Aufgabe hinzufügen",
        },
      },
    },
    fallbackLng: "de",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
