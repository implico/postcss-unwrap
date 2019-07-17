import postcss from 'postcss';
import test from 'ava';
import {readFile, plugify} from './helpers';
import unwrap from '..';

test.before(t => {
  t.context.CSS = readFile('./test/fixtures/test.css');
  t.context.CSS_UNWRAPPED = readFile('./test/fixtures/test-unwrapped.css');
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
