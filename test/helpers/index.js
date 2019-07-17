import fs from 'fs';
import postcss from 'postcss';

export const readFile = file => fs.readFileSync(file, 'utf-8');

export const plugify = callback => postcss.plugin('postcss-unwrap', () => callback);
