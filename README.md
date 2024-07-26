# using-temp-dir

Create a temporary directory, and remove it on disposition, with the
[`using`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html)
declaration of TypeScript.

## Import

```js
import {tempDir, tempDirSync} from '@compilets/using-temp-dir';
```

## API

```ts
interface AsyncTempDir extends AsyncDisposable {
    path: string;
}
export declare function tempDir(prefix?: string): Promise<AsyncTempDir>;

interface SyncTempDir extends Disposable {
    path: string;
}
export declare function tempDirSync(prefix?: string): SyncTempDir;
```

## Example

```ts
import {tempDir, tempDirSync} from '@compilets/using-temp-dir';

{
  await using dir = await tempDir();
  console.log(dir.path);
}

{
  using dir = tempDirSync();
  console.log(dir.path);
}
```
