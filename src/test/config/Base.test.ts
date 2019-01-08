import { init } from '../../main';

before('connect', async function() {
  await init();
});

after(function() {
  process.exit();
});
