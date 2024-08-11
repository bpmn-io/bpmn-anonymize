import * as fs from 'fs';

export async function readFile(moddle, file) {
  let contents = fs.readFileSync(file, { encoding: 'UTF-8' });
  const { rootElement, references } = await moddle.fromXML(contents);
  return { rootElement, references };
}

export async function writeFile(moddle, file, rootElement) {
  const { xml } = await moddle.toXML(rootElement, { format: true });
  const fileName = file.replace('.bpmn', '-anonymized.bpmn');
  return fs.writeFile(fileName, xml, error => {
    if (error) {
      console.error(`Error writing file: ${error}`);
    } else {
      console.log(`Saved anonymized file to ${fileName}`);
    }
  });
}