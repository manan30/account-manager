import { QuestionCollection } from 'inquirer';

export const cleanStart: QuestionCollection = [
  {
    name: 'clean',
    type: 'confirm',
    message: 'Start afresh?'
  }
];

export const seeds: QuestionCollection = [
  {
    name: 'seed',
    type: 'list',
    message: 'What would you like to seed',
    choices: ['Creditors', 'Everything']
  }
];

export const ActionTypeQuestions = [];
