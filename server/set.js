import { wasmBooted, Set as GeneralSet } from '../src/lib.rs';

export function loadSet(f) {
  wasmBooted().then(() => {
    f(GeneralSet);
  });
}
