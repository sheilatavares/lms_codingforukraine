[
  {
    questionText: 'What is a function declaration?',
    answerOptions: [
      {
        answerText: 'A way to declare variables in JavaScript.',
        isCorrect: false,
        explanation:
          'Function declarations and variable declarations are two distinct concepts in JavaScript.',
      },
      {
        answerText:
          'A block of code that performs specific tasks and can be reused many times in a program.',
        isCorrect: true,
        explanation: '',
      },
      {
        answerText: 'A way to access a function before it is defined.',
        isCorrect: false,
        explanation:
          'This describes the hoisting feature (moved to the top of their scope before code execution), not function declarations.',
      },
      {
        answerText: 'A statement that executes code based on a condition.',
        isCorrect: false,
        explanation:
          'Conditional statements and function declarations are two different things in programming.',
      },
    ],
  },
  {
    questionText:
      "What will be the output if we execute the code below in console panel?\n function printMessage() {console.log('Hello!');}\n",
    answerOptions: [
      {
        answerText: "'Hello!'",
        isCorrect: false,
        explanation:
          'We must invoke the function for see the result, otherwise nothing will be displayed.',
      },
      {
        answerText: 'undefined',
        isCorrect: false,
        explanation:
          'Nothing will be displayed, we need to invoke the function.',
      },
      {
        answerText: 'Nothing will be displayed',
        isCorrect: true,
        explanation: '',
      },
      {
        answerText: 'null',
        isCorrect: false,
        explanation:
          'Nothing will be displayed, we need to invoke the function.',
      },
    ],
  },
  {
    questionText: 'What happens when a function declaration is invoked?',
    answerOptions: [
      {
        answerText: 'The code inside the function body runs immediately.',
        isCorrect: true,
        explanation: '',
      },
      {
        answerText: 'The function is deleted from the program.',
        isCorrect: false,
        explanation: 'Invoking a function does not delete it from the program.',
      },
      {
        answerText:
          'The code inside the function body is declared but not executed.',
        isCorrect: false,
        explanation:
          'The code inside the function body is executed only when the function is invoked.',
      },
      {
        answerText: 'The function is skipped over and the program continues.',
        isCorrect: false,
        explanation: 'Skipping over a function does not execute its code.',
      },
    ],
  },
  {
    questionText:
      'Considering the function code below, which will be the output if we log in the console with parameters BirthYear(2023, 32)?:\n function BirthYear(currentYear, age) {let result = currentYear - age;}',
    answerOptions: [
      {
        answerText: 'Nothing will be displayed in console.',
        isCorrect: false,
        explanation:
          "Console will print ‘undefined’ because functions don't have the return keyword for the variable result.",
      },
      {
        answerText: '1991',
        isCorrect: false,
        explanation:
          'Console will print ‘undefined’ because functions don’t have the return keyword  for the variable result.',
      },
      {
        answerText: '1993',
        isCorrect: false,
        explanation:
          'Console will print ‘undefined’ because functions don’t have the return keyword  for the variable result.',
      },
      {
        answerText: 'undefined',
        isCorrect: true,
        explanation: '',
      },
    ],
  },
  {
    questionText: 'What does the return keyword do in a function?',
    answerOptions: [
      {
        answerText: 'It declares the function in the program.',
        isCorrect: false,
        explanation:
          'The function is declared when it is defined, not when the return keyword is used.',
      },
      {
        answerText: 'It executes the code inside the function body.',
        isCorrect: false,
        explanation:
          'The code inside the function body is executed when the function is invoked, not when the return keyword is used.',
      },
      {
        answerText: 'It specifies the output of the function.',
        isCorrect: true,
        explanation: '',
      },
      {
        answerText: 'It skips over the function and continues the program.',
        isCorrect: false,
        explanation: 'Skipping over a function does not execute its code.',
      },
    ],
  },
  {
    questionText: 'What is hoisting in JavaScript?',
    answerOptions: [
      {
        answerText:
          'A feature that allows functions to be invoked before they are defined.',
        isCorrect: true,
        explanation: '',
      },
      {
        answerText: 'A way to declare variables in JavaScript.',
        isCorrect: false,
        explanation:
          "Hoisting applies to function declarations, not variable declarations. It's a feature that allows functions to be invoked before they are defined.",
      },
      {
        answerText: 'A way to skip over code in a program.',
        isCorrect: false,
        explanation:
          'Hoisting does not skip over code but allows functions to be accessed before they are defined.',
      },
      {
        answerText: 'A type of condition statement in JavaScript.',
        isCorrect: false,
        explanation:
          'Hoisting is not a condition statement, is a feature that allows functions to be invoked before they are defined.',
      },
    ],
  },
  {
    questionText: 'What are parameters in a function?',
    answerOptions: [
      {
        answerText: 'Outputs returned by the function.',
        isCorrect: false,
        explanation: 'Parameters are inputs to a function, not outputs.',
      },
      {
        answerText: 'Statements that execute code based on a condition.',
        isCorrect: false,
        explanation:
          'Conditional statements and parameters are two different things in programming.',
      },
      {
        answerText: 'A type of operator in JavaScript.',
        isCorrect: false,
        explanation:
          'Parameters are not operators, they are inputs used by a function to perform a task.',
      },
      {
        answerText: 'Inputs used by a function to perform a task.',
        isCorrect: true,
        explanation: '',
      },
    ],
  },
];
