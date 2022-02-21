# Resizer

Resizer is a nodejs,express endpoind tested with jasmine and supertest for resizing images.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install dependencies.

```bash
npm i
```

## Description

Resizer is a express/nodejs project tested with [jasmine](https://www.npmjs.com/package/jasmine)/[supertest](https://www.npmjs.com/package/supertest) and protected with [helmet](https://www.npmjs.com/package/helmet),[rate-limit](https://www.npmjs.com/package/express-rate-limit) and suported by esLint/prittier,it resize any Image in public/full directory with the follwing quiry variables,

```
name: String , width: Number, height: Number

//example
Requesting : (get);
DomainName:3000/image?name='imageName'&width='1080'&height='780'
```

Requsted images will be cached im public/thumb directory to save your resources.

## scripts

build from typescript to javascript:

```
npm run build
```

fromat and organize TS project:

```
npm run clean-code
```

build and test project:

```
npm run clean-code
```

run nodemon to develop:

```
npm runn start-dev-server
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
