import { execSync } from 'child_process';
import packageJson from '../package.json';
import chalk from 'chalk';

const errorColor = chalk.bold.red;
const warningColor = chalk.hex('#FFA500'); // Orange color
const greenBoldColor = chalk.bold.green;

const runningOnCI = process.env.GITHUB_ACTIONS;

const currentIonicVersion = packageJson.devDependencies.currentIonicVersion;

const olderVersions = Object.values(packageJson.oldSupportedVersions);

console.log(greenBoldColor('\nRUNNING TESTS ON ALL SUPPORTED IONIC VERSIONS'));

[...olderVersions].forEach((ionicVersion) => {
  console.log(greenBoldColor(`\n- Testing with Ionic: ${ionicVersion}\n`));

  try {
    execSync(`npm i currentIonicVersion@${ionicVersion} --no-save`, {
      stdio: 'inherit',
    });
    execSync('npm run full-test', { stdio: 'inherit' });
  } catch (error) {
    if (!runningOnCI) {
      console.log(
        warningColor(
          `Restoring current Ionic Version to ${currentIonicVersion}`
        )
      );
      execSync(`npm i currentIonicVersion@${currentIonicVersion} --no-save`, {
        stdio: 'inherit',
      });
    }

    const message = `test run for ${ionicVersion} FAILED`;
    console.log(
      `\n❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️`
    );
    console.log(errorColor(message));
    console.log(
      `❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️`
    );

    throw message;
  }
});

console.log(greenBoldColor('\n🚀 Everything was a success 🚀\n'));
