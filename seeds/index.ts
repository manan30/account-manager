import inquirer from 'inquirer';
import { cleanStart, seeds } from './questions';
import { deleteAll } from './controller';

const cleanStartQuestion = async () => await inquirer.prompt(cleanStart);
const seedQuestions = async () => await inquirer.prompt(seeds);

const startSeed = async () => {
  console.log('Starting database seed');
  const { clean } = await cleanStartQuestion();
  // const { seed } = await seedQuestions();

  if (clean) {
    deleteAll();
  }

  // switch (seed) {
  // }
};

startSeed();
