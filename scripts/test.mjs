import { execSync } from 'child_process';
import packageJson from '../package.json';
import chalk from 'chalk';

const errorColor = chalk.bold.red;
const warningColor = chalk.hex('#FFA500'); // Orange color
const greenBoldColor = chalk.bold.green;

const runningOnCI = process.env.GITHUB_ACTIONS;

const currentIonicVersionCode = packageJson.devDependencies['@ionic/core'];

const olderVersions = Object.values(packageJson.oldSupportedVersions);

function restoreIonicVersionIfNeeded() {
  if (runningOnCI) {
    return;
  }
  console.log(
    warningColor(
      `Restoring current @ionic/core version to ${currentIonicVersionCode}`
    )
  );
  execSync(`npm i @ionic/core@${currentIonicVersionCode} --no-save`, {
    stdio: 'inherit',
  });
}

console.log(greenBoldColor('\nRUNNING TESTS ON ALL SUPPORTED IONIC VERSIONS'));

[...olderVersions].forEach((ionicVersionCode) => {
  const ionicInstallString = `@ionic/core@${ionicVersionCode}`;
  console.log(
    greenBoldColor(`\n- Testing with Ionic: ${ionicInstallString}\n`)
  );

  try {
    execSync(`npm i ${ionicInstallString} --no-save`, {
      stdio: 'inherit',
    });
    execSync('npm run full-test', { stdio: 'inherit' });
  } catch (error) {
    restoreIonicVersionIfNeeded();

    const message = `test run for ${ionicInstallString} FAILED`;
    console.log(
      `\n❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️\n`
    );
    console.log(
      `❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️`
    );
    console.log(errorColor(`    ${message}`));
    console.log(
      `❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️`
    );
    console.log(
      `❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️`
    );

    throw message;
  }
});

restoreIonicVersionIfNeeded();

console.log(greenBoldColor('\n🚀 Everything was a success 🚀\n'));
