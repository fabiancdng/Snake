# Snake

**A simple, object-oriented Snake game written in TypeScript using the native HTML5 canvas API.**

![Unable to load game demo](.github/media/game-demo.gif)

To try it out yourself:

1. Clone the repository:
```
git clone https://github.com/fabiancdng/Snake
```

2. `cd` into it:
```
cd Snake/
```

3. Install TypeScript (you might have to use `sudo`):
```
npm i -g typescript
```

4. Install `serve` as a local web server (or throw the files once compiled onto a real web server; you might have to use `sudo`):
```
npm i -g serve
```

5. Install dependencies:
```
npm i
```

6. Run `tsc` and `serve` using npm:
```
npm start
```

Alternatively, you can only run `tsc` to compile the TypeScript files and then throw the `dist/` folder alongside the `src/index.html` file and the `assets/` folder onto a real web server. Consider the import paths defined in `index.html`. Depending on your configuration you might have to adjust them.

<br>

**Copyright &copy; 2021 Fabian Reinders (fabiancdng)**