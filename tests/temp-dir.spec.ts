import assert from 'node:assert';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {describe, it} from 'node:test';

import {tempDir, tempDirSync} from '../src/index.ts';

describe('tempDir', () => {
  it('deletes dir on disposition', async () => {
    let path: string;
    {
      await using dir = await tempDir();
      path = dir.path;
      assert.ok(existsSync(dir.path));
    }
    assert.ok(!existsSync(path));
  });
});

describe('tempDirSync', () => {
  it('deletes dir on disposition', () => {
    let path: string;
    {
      using dir = tempDirSync();
      path = dir.path;
      assert.ok(existsSync(dir.path));
    }
    assert.ok(!existsSync(path));
  });
});
