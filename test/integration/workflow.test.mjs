
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyTemplate,
  extractEventData,
  getEventAction
} from '../../src/utils/templateEngine.js';

// Integration Test 1:
// GitHub event action + README template
test('Generate README text from merged PR event', () => {
  const action = getEventAction(
    'PullRequestEvent',
    {
      action: 'closed',
      pull_request: { merged: true }
    }
  );

  const output = applyTemplate(
    'Pull request was {action}',
    { action }
  );

  assert.equal(output, 'Pull request was merged');
});

// Integration Test 2:
// Private event data + template rendering
test('Protect private repository information', () => {
  const event = {
    type: 'PushEvent',
    public: false,
    repo: { name: 'secret/project' },
    created_at: '2026-01-01T00:00:00Z',
    payload: {
      ref: 'refs/heads/secret-branch'
    }
  };

  const data = extractEventData(event, {}, true);

  const output = applyTemplate(
    'Repository: {repo}',
    data
  );

  assert.equal(
    output,
    'Repository: a private repository'
  );

  assert.equal(data.repo_url, '');
  assert.equal(data.ref, '');
});
