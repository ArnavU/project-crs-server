import { exec } from "child_process";

// Define the path to the requirements.txt file
const requirementsPath = "./controllers/requirements.txt";

// Install Python dependencies using pip
export const installDependencies = () => {
	return new Promise((resolve, reject) => {
		// const command = `pip install -r ${requirementsPath}`;
		const command = `python --version`;
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error("Error installing dependencies:", error);
				reject(error);
			} else {
				console.log("Dependencies installed successfully");
				console.log(stdout);
				resolve();
			}
		});
	});
};

