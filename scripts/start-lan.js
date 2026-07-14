const { networkInterfaces } = require('os');
const { spawn } = require('child_process');

function getLocalIP() {
  const nets = networkInterfaces();

  for (const interfaces of Object.values(nets)) {
    for (const net of interfaces ?? []) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        !net.address.startsWith('169.254')
      ) {
        return net.address;
      }
    }
  }

  return null;
}

const ip = getLocalIP();

if (!ip) {
  console.error('Could not detect LAN IP. Try: npm run start:usb (USB) or npm run start:tunnel');
  process.exit(1);
}

const port = '8081';
const apiUrl = `http://${ip}:4000/api`;
const expoUrl = `exp://${ip}:${port}`;

console.log('');
console.log('========================================');
console.log('  Connect your phone to this URL:');
console.log(`  ${expoUrl}`);
console.log(`  API: ${apiUrl}`);
console.log('========================================');
console.log('');
console.log('In Expo Go: tap "Enter URL manually" and paste the URL above.');
console.log('Phone and PC must be on the same Wi-Fi network.');
console.log('Make sure backend is running: cd backend && npm run dev');
console.log('');

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['expo', 'start', '--lan', '--port', port, '--clear'],
  {
    env: {
      ...process.env,
      REACT_NATIVE_PACKAGER_HOSTNAME: ip,
      EXPO_PUBLIC_API_URL: apiUrl,
    },
    stdio: 'inherit',
    shell: true,
  },
);

child.on('exit', (code) => process.exit(code ?? 0));
