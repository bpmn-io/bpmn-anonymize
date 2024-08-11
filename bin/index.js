#!/usr/bin/env node
import yargs from 'yargs';
import BpmnModdle from 'bpmn-moddle';
import { readFile, writeFile } from '../lib/file.js';
import {
  anonymizeReferences,
  anonymizeFlowElements,
  anonymizeCategoryValue,
  anonymizeArtifacts,
  anonymizeParticipants } from '../lib/anonymize.js';

yargs(process.argv.slice(2))
  .scriptName('bpmn-anonymize')
  .usage('Usage: $0 <source file>')
  .command(
    '$0 <source file>',
    'Anonymize a BPMN file',
    () => {},
    (args) => run(args),
  )
  .help().alias('h', 'help')
  .version().alias('v', 'version')
  .argv;

async function run({ sourcefile }) {
  console.log(`Anonymizing ${sourcefile}...`);

  const moddle = new BpmnModdle();
  const { rootElement, references = [] } = await readFile(moddle, sourcefile);

  anonymizeReferences(references);
  anonymizeFlowElements(rootElement);
  anonymizeCategoryValue(rootElement);
  anonymizeArtifacts(rootElement);
  anonymizeParticipants(rootElement);

  await writeFile(moddle, sourcefile, rootElement);
}