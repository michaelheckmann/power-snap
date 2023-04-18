# PowerSnap 📸💻

PowerSnap is a simple, lightweight, and easy to use screen capture tool. It is written in NodeJS using [Node Canvas](https://github.com/Automattic/node-canvas) to create the image. The tool can be used from the command line or as an Alfred Workflow.

| Before  | After |
| ------------- | ------------- |
| ![Before](pic.png)  | ![After](image.png)  |

## Installation

1. Install the requirements for canvas

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

2. Install the dependencies

```bash
npm install
```

3. Try it out!

```bash
npm start
```

## Build

You can build the project with this command:

```bash
npm run build
```

It uses Vercel's [ncc](https://github.com/vercel/ncc) to compile the project into a single file. Make sure to install it before running the build command.

```bash
npm i -g @vercel/ncc
```

**Important**: The build command will not package the Canvas dependencies. You will need to install them manually by running `npm i canvas` in the `dist` folder. This is necessary, because the `ncc` package does not support native modules.

## Alfred Workflow

Grab the latest workflow from the Releases page and install it. You can then use the `snap` keyword to take a screenshot.

## Todos
- [ ] Allow users to modify the options from the command line
- [ ] Allow users to modify the options from the Alfred command
