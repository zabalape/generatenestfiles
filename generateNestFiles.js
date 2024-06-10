#!/usr/bin/env node

const { exec } = require('child_process');
const readlineSync = require('readline-sync');

const generateFiles = (name) => {
  const commands = [
    `nest generate module ${name}`,
    `nest generate service ${name}`,
    `nest generate controller ${name}`,
    `mkdir -p src/${name}/schemas`,
    `touch src/${name}/schemas/${name}.schema.ts`
  ];

  commands.forEach((command) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  });
};

// Leer la entrada del usuario
const input = readlineSync.question('Ingresa los nombres de los módulos separados por comas: ');
const tableNames = input.split(',').map((name) => name.trim());

tableNames.forEach((name) => {
  generateFiles(name);
});
