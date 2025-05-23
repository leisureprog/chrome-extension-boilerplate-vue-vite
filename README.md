<div align="center">

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./content/preview.png" />
    <source media="(prefers-color-scheme: light)" srcset="./content/preview.png" />
    <img alt="Logo" src="./content/preview.png" />
</picture>

![](https://img.shields.io/badge/Vue.js-35495E?style=flat-square&logo=vuedotjs&logoColor=4FC08D)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)

</div>

> [!NOTE]
> This project is listed in the [Awesome Vite](https://github.com/vitejs/awesome-vite)

> [!TIP]
> Share storage state between all pages
>
> https://github.com/user-attachments/assets/3b8e189f-6443-490e-a455-4f9570267f8c

> Rewritten version of [Jonghakseo/chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) with Vue 3 instead of React

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Structure](#structure)
    - [ChromeExtension](#structure-chrome-extension)
    - [Packages](#structure-packages)
    - [Pages](#structure-pages)
- [Getting started](#getting-started)
    - [Chrome](#getting-started-chrome)
- [Install dependency](#install-dependency)
    - [For root](#install-dependency-for-root)
    - [For module](#install-dependency-for-module)
- [Community](#community)
- [Reference](#reference)
- [Star History](#star-history)
- [Contributors](#contributors)

## Intro <a name="intro"></a>

This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite(Rollup) & Turborepo.

## Features <a name="features"></a>

- [Vue3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Turborepo](https://turbo.build/repo)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Custom HMR(Hot Module Rebuild) Plugin](/packages/hmr/)
- [End to End Testing with WebdriverIO](https://webdriver.io/)

## Getting started: <a name="getting-started"></a>

1. When you're using Windows run this:
   - `git config --global core.eol lf`
   - `git config --global core.autocrlf input`
   #### This will change eol(End of line) to the same as on Linux/Mac, without this, you will have conflicts with your teammates with those systems and our bash script won't work
2. Clone this repository.
3. Install bun globally: `npm install -g bun` (check your node version >= 18.19.1))
4. Run `bun install`

### And then, depending on needs:

### For Chrome: <a name="getting-started-chrome"></a>

1. Run:
    - Dev: `bun dev` (On windows, you should run as administrator. [(Issue#456)](https://github.com/leisureprog/chrome-extension-boilerplate-vue-vite/issues/456)
    - Prod: `bun build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder at root

## Install dependency for turborepo: <a name="install-dependency"></a>

### For root: <a name="install-dependency-for-root"></a>

1. Run `bun i <package> -w`

### For module: <a name="install-dependency-for-module"></a>

1. Run `bun i <package> -F <module name>`

`package` - Name of the package you want to install e.g. `nodemon` \
`module-name` - You can find it inside each `package.json` under the key `name`, e.g. `@extension/content-script`, you can use only `content-script` without `@extension/` prefix

## Env Variables

1. Copy `.example.env` and paste it as `.env` in the same path
2. Add a new record inside `.env`
3. Add this key with type for value to `vite-env.d.ts` (root) to `ImportMetaEnv`
4. Then you can use it with `import.meta.env.{YOUR_KEY}` like with standard [Vite Env](https://vitejs.dev/guide/env-and-mode)

#### If you want to set it for each package independently:

1. Create `.env` inside that package
2. Open related `vite.config.mts` and add `envDir: '.'` at the end of this config
3. Rest steps like above

#### Remember you can't use global and local at the same time for the same package(It will be overwritten)

## Structure <a name="structure"></a>

### ChromeExtension <a name="structure-chrome-extension"></a>

Main app with background script, manifest

- `manifest.js` - manifest for chrome extension
- `src/background` - [background script](https://developer.chrome.com/docs/extensions/mv3/background_pages/) for chrome
  extension (`background.service_worker` in
  manifest.json)
- `public/content.css` - content css for user's page injection

### Packages <a name="structure-packages"></a>

Some shared packages

- `dev-utils` - utils for chrome extension development (manifest-parser, logger)
- `hmr` - custom HMR plugin for vite, injection script for reload/refresh, hmr dev-server
- `shared` - shared code for entire project. (types, constants, custom hooks, components, etc.)
- `storage` - helpers for [storage](https://developer.chrome.com/docs/extensions/reference/api/storage) easier integration with, e.g local, session storages
- `tailwind-config` - shared tailwind config for entire project
- `tsconfig` - shared tsconfig for entire project
- `ui` - here's a function to merge your tailwind config with global one, and you can save components here
- `vite-config` - shared vite config for entire project
- `archiver` - By ```bun zip``` you can pack ```dist``` folder into ```extension.zip``` inside newly created ```dist-zip```
- `e2e` - By ```bun e2e``` you can run end to end tests of your zipped extension on different browsers

### Pages <a name="structure-pages"></a>

- `content` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for chrome
  extension (`content_scripts` in manifest.json)
- `content-ui` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for render UI in
  user's page (`content_scripts` in manifest.json)
- `content-runtime` - [content runtime script](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#functionality)
  this can be inject from `popup` like standard `content`
- `devtools` - [devtools](https://developer.chrome.com/docs/extensions/mv3/devtools/#creating) for chrome
  extension (`devtools_page` in manifest.json)
- `devtools-panel` - devtools panel for [devtools](pages/devtools/src/index.ts)
- `new-tab` - [new tab](https://developer.chrome.com/docs/extensions/mv3/override/) for chrome
  extension (`chrome_url_overrides.newtab` in manifest.json)
- `options` - [options](https://developer.chrome.com/docs/extensions/mv3/options/) for chrome extension (`options_page`
  in manifest.json)
- `popup` - [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/) for chrome
  extension (`action.default_popup` in
  manifest.json)
- `side-panel` - [sidepanel(Chrome 114+)](https://developer.chrome.com/docs/extensions/reference/sidePanel/) for chrome
  extension (`side_panel.default_path` in manifest.json)

## Reference <a name="reference"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Turborepo](https://turbo.build/repo/docs)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)

---

