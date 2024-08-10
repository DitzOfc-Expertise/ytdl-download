# About
This package is used to download & search YouTube media. You can contribute via [GitHub](https://github.com/DitzOfc-Expertise/ytdl-download)

# Instalation
To install this package, you can follow the steps below:
```sh
$ npm install ytdl-down
```

# How to usage
If you have installed the package, you can use it with the code example below:
- ECMA Modules Example (ESM)
```javascript
import Youtube from "ytdl-down"

const yt = new Youtube()
const out = await yt.search("Somebody Pleasure")

// Logging Output Results
console.log(out)
```

- CommonJS (CJS)
```javascript
const Youtube = require("ytdl-down")

const yt = new Youtube()
const out = await yt.search("Somebody Pleasure")

// Logging Output Results
console.log(out)
```
The example above is an example of searching for YouTube Media via a query, Now the code example below is downloading YouTube media via URL.

- ECMA Modules (ESM)
```javascript
import Youtube from "ytdl-down"

const yt = new Youtube()
const out = await yt.ytdlnew("https://www.youtube.com/watch?v=xxxx")

// Logging Output Results
console.log(out)
```

- CommonJS (CJS)
```javascript
const Youtube = require("ytdl-down")

const yt = new Youtube()
const out = await yt.ytdlnew("https://www.youtube.com/watch?v=xxxx")

// Logging Output Results
console.log(out)
```

# Addition
This package is free & open source, I'm glad you can use the package I made ^_^