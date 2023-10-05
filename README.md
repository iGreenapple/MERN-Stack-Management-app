# Vytvoření projektu
  Vytvoření root folder → v něm spustíme npm init pro nainstalování dev dependency: nodemon, concurrently
  Dále vytvoříme backend a frontend složky
# Backend
npm i --save express → instalace expres do dependencies

## Typescript
npm i --save-dev ts-node → instalace ts-node (k tomu aby jsme rozběhli ts soubory)

npm i --save-dev @types/express → abych mohl definovat typy proměnných i pro express, musím toto nainstalovat 

## Vysvětlivky k npm install
--save: This will install and add the package name and version in the dependencies section of your package.json file. These dependencies are modules that your project will use while in production.
--save-dev: This works in the same way as the --save flag. It will install and add the package name in the devDependencies section of the package.json file. These dependencies are modules that your project will use during development.
--save-exact: This keeps the original version of the installed package. This means, if you share your project with other people, they will be able to install the exact same version of the package that you use.

# frontend
frontend jsme vytvořili přes vite → npm create vite@latest frontend (rovnou to vytvoří i složku frontend)
  framework - react
  variant . typescript

## instalace Tailwind
  npm install -D tailwindcss postcss autoprefixer