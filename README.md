# SETUP

- Einmal `yarn install` sowohl in `mirthgraph/server`, als auch in `mirthgraph/frontend`
- Redis auf einer WSL Maschine installieren
- Beide Programme starten mit folgenden Commands im jeweiligen Root-Ordner:
    - server: `yarn start:prod`
    - frontend: `yarn build` und dann auf einem Webserver deployen. Siehe: https://quasar.dev/quasar-cli-vite/developing-spa/deploying#introduction