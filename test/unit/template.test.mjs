
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyTemplate,
  getEventAction
} from '../../src/utils/templateEngine.js';

// Test 1: Replace repeated placeholders
test('Replace repeated placeholders', () => {
  const result = applyTemplate(
    '{repo} / {repo}',
    { repo: 'my-project' }
  );

  assert.equal(result, 'my-project / my-project');
});

// Test 2: Handle special characters
test('Handle special characters', () => {
  const result = applyTemplate(
    '{repo}',
    { repo: '$& project' }
  );

  assert.equal(result, '$& project');
});

// Test 3: Detect merged pull requests
test('Detect merged pull requests', () => {
  const result = getEventAction(
    'PullRequestEvent',
    {
      action: 'closed',
      pull_request: { merged: true }
    }
  );

  assert.equal(result, 'merged');
});

// Test 4: Detect closed pull requests
test('Detect closed pull requests', () => {
  const result = getEventAction(
    'PullRequestEvent',
    {
      action: 'closed',
      pull_request: { merged: false }
    }
  );

  assert.equal(result, 'closed');
});
