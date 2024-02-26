import { exec } from 'child_process';

// Path to the Python script
const pythonScriptPath = 'main.py';

// Function to run the Python script and return a promise
export const runPythonMain = () => {
  return new Promise((resolve, reject) => {
    const command = `python ${pythonScriptPath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error running Python script:', error);
        reject(error);
      } else {
        console.log('Python script executed successfully');
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);
        resolve(stdout);
      }
    });
  });
};

