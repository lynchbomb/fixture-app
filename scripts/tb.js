#!/usr/bin/env node

const path = require('path');
const jsonQuery = require('json-query');
const ora = require('ora');
const {
  spawn
} = require('child_process');
const app = {
  control: `file://${path.join(process.cwd() + '/dist/index.html')}`,
  experiment: `file://${path.join(process.cwd() + '/dist/index.html')}`,
};

// check for tracerbench compare significant results
const spinner = ora('TracerBench: Running \n').start();
const tb = spawn('tracerbench', ['compare', `--controlURL=${app.control}`, `--experimentURL=${app.experiment}`, `--json`]);
const results = [];

spinner.text = `TracerBench: tracerbench compare --controlURL=${app.control} --experimentURL=${app.experiment} --json \n`;

tb.stdout.on('data', (data) => {
  results.push(`${data}`);
});

// tb.stderr.on('data', (data) => {
//   console.log(`${data}`);
// });

tb.on('close', (code) => {
  tbAnalyze();
});

function tbAnalyze() {
  spinner.text = `TracerBench: analyzing data...\n`;

  // query results data and check if any phase is significant
  // return an array of only the phases that are 
  const sigPhases = jsonQuery('[**][*rankSumSignificant=Yes]', {
    data: `${results}`
  }).value;

  spinner.stop();

  if (sigPhases.length > 0) {
    try {
      sigPhases.forEach((phase) => {
        // significant phases found (regression or improvement)
        console.warn(`TracerBench: Complete - Rank Sum Significant Phases: ${phase.statName}`);
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    console.warn(`TracerBench: Complete - No Significant Rank Sum Phases Found`);
  }
}
