var fs = require('fs'); 
const fsPromises = require('fs').promises;
const $RefParser = require("@apidevtools/json-schema-ref-parser");

const SPEC_PATH = "./src/specification/global-recruits.yaml";
const OUTPUT_FOLDER = "./src/validation/"

async function convertYAMLSpec() {
    const paths = await $RefParser.dereference(SPEC_PATH);
    const output = 'export const GlobalRecruits = ' + JSON.stringify(paths.paths); 
    await fsPromises.writeFile(OUTPUT_FOLDER + 'GlobalRecruits.ts', output);
}

convertYAMLSpec();