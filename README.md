### React App (Typescript + Yarn)のセットアップ(自分用メモ)

// create app template
$ npx create-react-app {プロジェクト名} --template typescript
// activate yarn
$ yarn
// enable support plugin in VS code
// https://yarnpkg.com/getting-started/editor-sdks#vscode
$ yarn dlx @yarnpkg/sdks vscode
//when you switch to production
//windows
$ set NODE_ENV=production
//linux
$ NODE_ENV=production

### Reference

- [React で使用する株価ローソク足表示ライブラリは Appache Echarts がおすすめです。株価分析 Web アプリでのカスタマイズ事例紹介](https://zenn.dev/satoshi_tech/articles/20230507-apache-echarts-marker)
- [StockChartApp(Github)](https://github.com/IoT-Arduino/StockChartApp)
