// Oprogramowanie pośredniczące
import bodyParser from 'body-parser'; // w js nie ma zadnego body-parsera, dlatego musimy go zainstalowac
import morgan from 'morgan'; // odpowiedzialne za generowanie logów

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false })); // aplikacja akceptuje tylko zapytania URL
  app.use(morgan('dev')); // kolorowe logi, najlepsze dla developerów
};
