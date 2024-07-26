import {mkdtemp, rm} from 'node:fs/promises';
import {mkdtempSync, rmSync} from 'node:fs';
import {sep} from 'node:path';
import {tmpdir} from 'node:os';

interface AsyncTempDir extends AsyncDisposable {
  path: string;
}

export async function tempDir(prefix = ''): Promise<AsyncTempDir> {
  const path = await mkdtemp(tmpdir() + sep + prefix);
  return {
    path,
    async [Symbol.asyncDispose]() {
      await rm(path, {recursive: true});
    },
  };
}

interface SyncTempDir extends Disposable {
  path: string;
}

export function tempDirSync(prefix = ''): SyncTempDir {
  const path = mkdtempSync(tmpdir() + sep + prefix);
  return {
    path,
    [Symbol.dispose]() {
      rmSync(path, {recursive: true});
    },
  };
}
