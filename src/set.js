import { wasmBooted, Set as GeneralSet } from './lib.rs';

export function loadSet(f) {
  wasmBooted.then(() => {
    f(GeneralSet);
  });
}
