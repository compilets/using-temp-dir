import {mkdtemp, rm} from 'node:fs/promises';
import {mkdtempSync, rmSync} from 'node:fs';
import {sep} from 'node:path';
import {tmpdir} from 'node:os';

interface AsyncTempDir extends AsyncDisposable {
  path: string;
}

export async function tempDir(prefix?: string): Promise<AsyncTempDir> {
  const path = await mkdtemp(prefix ?? tmpdir() + sep);
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

export function tempDirSync(prefix?: string): SyncTempDir {
  const path = mkdtempSync(prefix ?? tmpdir() + sep);
  return {
    path,
    [Symbol.dispose]() {
      rmSync(path, {recursive: true});
    },
  };
}
