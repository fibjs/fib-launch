const fs = require('fs');
const path = require('path');
const os = require("os");

const plistTemplate = (label, script) => `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${label}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${process.execPath}</string>
        <string>${script}</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>LimitLoadToSessionType</key>
    <string>Aqua</string>
</dict>
</plist>
`;

exports.register = function (options) {
    const label = options.label || 'com.example.myapp';
    const script = options.script || 'your_script.js';
    const plistContent = plistTemplate(label, script);
    const plistPath = path.join(os.homedir(), 'Library/LaunchAgents', `${label}.plist`);

    fs.writeFileSync(plistPath, plistContent, 'utf8');
}

exports.unregister = function (options) {
    const label = options.label || 'com.example.myapp';
    const plistPath = path.join(os.homedir(), 'Library/LaunchAgents', `${label}.plist`);

    if (fs.existsSync(plistPath))
        fs.unlinkSync(plistPath);
}