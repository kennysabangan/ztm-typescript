import { readFileSync } from 'fs';

const args = process.argv.slice(2);
console.log(args);

const filename = args[0];
const searchString = args[1];
const contents = readFileSync(filename, "utf8");

const lines = contents.split("\n");
console.log(lines);

for (let line of lines) {
    if (line.includes(searchString)) {
        console.log(line);
    }
}