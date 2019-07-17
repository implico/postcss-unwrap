import postcss from 'postcss';

export const plugify = callback => postcss.plugin('postcss-unwrap', () => callback);
