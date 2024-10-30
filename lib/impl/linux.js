const fs = require('fs');
const os = require('os');
const path = require('path');

const autostartDir = path.join(os.homedir(), '.config', 'autostart');

exports.register = function (options) {
    const label = options.label || 'com.example.myapp';
    const script = options.script || 'your_script.js';
    const desktopFilePath = path.join(autostartDir, `${label}.desktop`);

    fs.mkdirSync(autostartDir, { recursive: true });

    const desktopEntry = `
[Desktop Entry]
Type=Application
Exec=${process.execPath} "${script}"
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=${label}
Comment=Start ${label} at login
`;

    fs.writeFileSync(desktopFilePath, desktopEntry.trim(), 'utf8');
}

exports.unregister = function (options) {
    const label = options.label || 'com.example.myapp';
    const desktopFilePath = path.join(autostartDir, `${label}.desktop`);

    if (fs.existsSync(desktopFilePath)) {
        fs.unlinkSync(desktopFilePath);
    }
}