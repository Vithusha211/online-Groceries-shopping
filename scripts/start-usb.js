const { execSync, spawn } = require('child_process');

const port = '8081';

try {
  execSync('adb reverse tcp:8081 tcp:8081', { stdio: 'inherit' });
  console.log('USB port forwarding enabled (adb reverse).');
} catch {
  console.error('');
  console.error('adb not found or no device connected.');
  console.error('Connect your Android phone via USB with USB debugging on,');
  console.error('or use: npm start (Wi-Fi) instead.');
  console.error('');
  process.exit(1);
}

console.log('');
console.log('========================================');
console.log('  Expo Go URL (USB):');
console.log(`  exp://localhost:${port}`);
console.log('========================================');
console.log('');

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['expo', 'start', '--localhost', '--port', port, '--clear'],
  {
    env: {
      ...process.env,
      REACT_NATIVE_PACKAGER_HOSTNAME: 'localhost',
    },
    stdio: 'inherit',
    shell: true,
  },
);

child.on('exit', (code) => process.exit(code ?? 0));
