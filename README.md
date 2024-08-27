# README (v1.0.1)

## ENGLISH

### DEV SETUP

- Run `yarn install` once in both `mirthgraph/server` and `mirthgraph/frontend`.
- Install Redis on a VM.
- Start both programs with the following commands in their respective root folders:
  - server: `yarn start:dev`
  - frontend: `yarn dev`

### ADD DATA

- Add an exported Mirth configuration XML to the `/server/public` folder (currently, it must be named `218.xml`)

### DEPLOYMENT WITH DOCKER

- The Docker Compose image contains everything needed for the software.
- Clone the repository FRESH into a directory.
- In `/server` and `/frontend` copy `.env.base` and rename it to `.env`.
- In `/server/.env` replace `localhost` with `redis`.
- In `/frontend/.env` replace `localhost` with the server address.
  - If desired, also replace DEV with PROD.
- In the root directory (NOT in `/server` or `/frontend`) deploy with `docker compose -f docker-compose.yml up -d --build`.



## GERMAN

### DEV SETUP

- Einmal `yarn install` sowohl in `mirthgraph/server`, als auch in `mirthgraph/frontend`.
- Redis auf einer VM installieren.
- Beide Programme mit folgenden Commands im jeweiligen Root-Ordner starten:
  - server: `yarn start:dev`
  - frontend: `yarn dev`

### DEPLOYMENT MIT DOCKER

- Das Docker Compose Image enthält alles, was für die Software nötig ist.
- Das Repository FRISCH in ein Verzeichnis clonen.
- In `/server` und `/frontend` `.env.base` kopieren und in `.env` umbenennen.
- In `/server/.env` `localhost` durch `redis` ersetzen.
- In `/frontend/.env` `localhost` durch die Serveradresse ersetzen.
  - Falls gewünscht auch `DEV` durch `PROD` ersetzen.
- Im Root-Verzeichnis (nicht in `/server` oder `/frontend`) mit `docker compose -f docker-compose.yml up -d --build` deployen.
