# igloo web JS

---

## What is it?

The purpose of this JS code is to make your regular HTML/JS/CSS work experience easier than building it from scratch.
Great for those who want to create simple plain HTML just for testing purposes, POC (Proof of Concept) products, or just for fun :D

---

## Installation

### Requirement

- NPM
- Node.js

### Installing http-server

Install http-server globally by using this command `npm install -g http-server` on terminal (mac/linux) or cmd (windows).

---

## Run

### Method 1

Open project root directory and run `http-server`, use `-p` or `--port` to use custom port (default to `8080`)

### Method 2

Open project root directory and just run `npm run web-server`, this command will run the server with port `4490` and cache for 1 second only

---

## Routing

This project will use folder name as the pathname or endpoint, for example: if we have directory name 'mypage' then we can open the page by using `/mypage`

---

## Instruction

Create directory according to the pathname you will create on `/assets/pages`, then create file web.html (HTML) & script.js (Javascript) inside your directory.
