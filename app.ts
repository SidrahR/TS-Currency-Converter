#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const usdToPkr = 228.43;
const pkrToUsd = 0.0044;
const euToPkr = 239.85;
const pkrToEu = 0.0042;
const usdToEu = 0.95;
const euToUsd = 1.05;
let repeat = true;

console.clear();
console.log(chalk.yellowBright.underline.bold("\nCURRENCY CONVERTER\n"));

do {
  const answers: { inputFrom: string; inputTo: string; inputAmount: number } =
    await inquirer.prompt([
      {
        name: "inputFrom",
        type: "list",
        message: "Select currency that you want to convert",
        choices: ["USD", "PKR", "EU"],
      },
      {
        name: "inputTo",
        type: "list",
        message: "Into?",
        choices: ["USD", "PKR", "EU"],
      },
      {
        name: "inputAmount",
        type: "number",
        message: "Enter amount: ",
        default: 0,
      },
    ]);

  let result: number;
  switch (answers.inputFrom) {
    case "USD":
      if (answers.inputTo == "PKR") {
        result = answers.inputAmount * usdToPkr;
        console.log(
          chalk.greenBright(
            `\n\t${answers.inputAmount} USD to PKR = ${result}\n`
          )
        );
        break;
      } else if (answers.inputTo == "USD") {
        result = answers.inputAmount;
        console.log(
          chalk.greenBright(
            `\n\t${answers.inputAmount} USD to USD = ${result}\n`
          )
        );
        break;
      } else if (answers.inputTo == "EU") {
        result = answers.inputAmount * usdToEu;
        console.log(
          chalk.greenBright(
            `\n\t${answers.inputAmount} USD to EU = ${result}\n`
          )
        );
        break;
      }

    case "PKR":
      if (answers.inputTo == "PKR") {
        result = answers.inputAmount;
        console.log(`\n\t${answers.inputAmount} PKR to PKR = ${result}\n`);
        break;
      } else if (answers.inputTo == "USD") {
        result = answers.inputAmount * pkrToUsd;
        console.log(`\n\t${answers.inputAmount} PKR to USD = ${result}\n`);
        break;
      } else if (answers.inputTo == "EU") {
        result = answers.inputAmount * pkrToEu;
        console.log(`\n\t${answers.inputAmount} PKR to EU = ${result}\n`);
        break;
      }

    case "EU":
      if (answers.inputTo == "PKR") {
        result = answers.inputAmount * euToPkr;
        console.log(`\n\t${answers.inputAmount} EU to PKR = ${result}\n`);
        break;
      } else if (answers.inputTo == "USD") {
        result = answers.inputAmount * euToUsd;
        console.log(`\n\t${answers.inputAmount} EU to USD = ${result}\n`);
        break;
      } else if (answers.inputTo == "EU") {
        result = answers.inputAmount;
        console.log(`\n\t${answers.inputAmount} EU to EU = ${result}\n`);
        break;
      }
  }

  const cont = await inquirer.prompt([
    {
      name: "cont",
      type: "confirm",
      message: "Do you want to perform another conversion?",
    },
  ]);
  repeat = cont.cont;
  if (repeat == false) {
    console.log(chalk.redBright("\n\tThank you"));
  } else {
    console.log("\n");
  }
} while (repeat != false);
