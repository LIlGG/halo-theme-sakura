import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-chained-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    backend: {
      backends: [
        LocalStorageBackend,
        resourcesToBackend((language, namespace, callback) => {
          import(`../languages/${language}.json`)
            .then(({ default: resources }) => {
              console.log(resources)
              callback(null, resources);
            })
            .catch((error) => {
              callback(error, null);
            });
        }),
      ],
      backendOptions: [
        {
          prefix: "i18next_sakura_",
          defaultVersion: "2.0.0-beta.2",
        },
      ],
    },
    debug: true,
    lowerCaseLng: true,
    cleanCode: true,
  });
