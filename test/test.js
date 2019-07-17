import fs from 'fs';
import postcss from 'postcss';
import test from 'ava';
import {plugify} from './helpers';
import unwrap from '..';

test.before(t => {
  t.context.CSS = fs.readFileSync('./test/fixtures/test.css', 'utf-8');
  t.context.CSS_UNWRAPPED = fs.readFileSync('./test/fixtures/test-unwrapped.css', 'utf-8');
});

test('main', async t => {
  const unwrapPlugin = plugify(CSS => {
    CSS.walkAtRules('media', atRule => {
      unwrap(atRule);
    });
  });
  const {css} = await postcss([unwrapPlugin]).process(t.context.CSS, {from: undefined});
  t.is(css, t.context.CSS_UNWRAPPED);
});
