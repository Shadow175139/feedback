# Feedback Hub

A small feedback management experiment built with plain HTML, CSS, and JavaScript. Responses are stored in the browser's `localStorage`, so there is no database or backend to configure.

## Run with Docker

```bash
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080).

To stop the application:

```bash
docker compose down
```

## Run without Docker

Open `index.html` in a browser, or serve the folder with any static web server.

## GitHub workflow

The workflow in `.github/workflows/docker.yml` builds the Docker image, starts a container, and checks that the application responds on every push to `main` and every pull request. To maintain the source code on GitHub:

```bash
git init
git add .
git commit -m "Create feedback hub experiment"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repository>.git
git push -u origin main
```
