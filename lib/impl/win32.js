const registry = require('registry');

const run_key = `Software\\Microsoft\\Windows\\CurrentVersion\\Run`;

exports.register = function (options) {
    const label = options.label || 'com.example.myapp';
    const script = options.script || 'your_script.js';

    const value = `"${process.execPath}" "${script}"`;
    registry.set(registry.CURRENT_USER, `${run_key}\\${label}`, value, registry.SZ);
}

exports.unregister = function (options) {
    const label = options.label || 'com.example.myapp';

    if (registry.has(registry.CURRENT_USER, `${run_key}\\${label}`))
        registry.del(registry.CURRENT_USER, `${run_key}\\${label}`);
}