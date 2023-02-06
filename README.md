# README (v1.0.1)

## DEV SETUP

- Einmal `yarn install` sowohl in `mirthgraph/server`, als auch in `mirthgraph/frontend`.
- Redis auf einer VM installieren.
- Beide Programme mit folgenden Commands im jeweiligen Root-Ordner starten:
  - server: `yarn start:dev`
  - frontend: `yarn dev`

## DEPLOYMENT MIT DOCKER

- Das Docker Compose Image enthält alles, was für die Software nötig ist.
- Das Repository FRISCH in ein Verzeichnis clonen.
- In `/server` und `/frontend` `.env.base` kopieren und in `.env` umbenennen.
- In `/server/.env` `localhost` durch `redis` ersetzen.
- In `/frontend/.env` `localhost` durch die Serveradresse ersetzen (z.B. `ukb473`) ersetzen.
  - Falls gewünscht auch `DEV` durch `PROD` ersetzen.
- Im Root-Verzeichnis (nicht in `/server` oder `/frontend`) mit `docker compose -f docker-compose.yml up -d --build` deployen.
