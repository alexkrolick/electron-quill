# Preact + Quill + Electron

A desktop text editor app built with [Electron] using the [Preact-Photon] UI library, [Yarn] for package management, and [Babel] and [Webpack2] for compilation.

[Preact-Photon]: https://github.com/developit/preact-photon
[Yarn]: https://yarnpkg.com/en/
[Babel]: https://babeljs.io/
[Webpack2]: https://webpack.js.org/
[Electron]: http://electron.atom.io/

See [package.json](./package.json) for scripts and dependencies, including:
- [Preact](https://preactjs.com/)
- [Photon](http://photonkit.com/)
- [Electron](http://electron.atom.io/)
- [Quill Editor](https://quilljs.com)

## Usage

First, install [Yarn] for your system (you can replace `yarn` with `npm` below if you don't wish to switch yet)
- `yarn install` Install dependencies.
- `yarn watch` Compile development version and watch for changes. Bundled files will appear in `dist/`.
- `yarn start` Start the desktop app (while watcher is running in another terminal). Use Ctrl-R or Cmd-R to reload the app.

![Screen capture](https://cloud.githubusercontent.com/assets/1571667/23353065/6053156e-fc7f-11e6-84c1-b7927857b2fd.gif)
