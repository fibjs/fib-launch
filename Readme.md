# fib-launch

### Overview
`fib-launch` is a versatile and robust cross-platform utility designed to manage the automatic launching of applications on system startup. It supports a wide range of operating systems, including Windows, macOS, and Linux, providing a unified interface for registering and unregistering applications to start at login. This tool is particularly useful for developers and system administrators who need to ensure that certain applications are always running when the system starts, regardless of the operating system. By leveraging `fib-launch`, users can streamline their workflow, improve productivity, and ensure that critical applications are always available when needed.

### Features

- **Cross-Platform Support**: `fib-launch` works seamlessly on Windows, macOS, and Linux, making it a versatile tool for managing startup applications across different environments. This ensures that users can rely on a consistent experience regardless of the operating system they are using.
- **Simple API**: `fib-launch` provides a straightforward API for registering and unregistering applications to start at login. This makes it easy for developers to integrate startup functionality into their applications.
- **Lightweight**: `fib-launch` is designed to be lightweight and efficient, minimizing its impact on system resources while providing reliable startup management.
- **Reliable**: The utility ensures that applications are consistently launched at startup, providing a dependable solution for critical applications that need to be available immediately after the system boots.

## Installation

To install `fib-launch`, you need to have `fibjs` installed on your system. You can then install the package using npm:

```bash
fibjs --install fib-launch
```

## Usage

### Basic Setup

To use `fib-launch`, you need to require it in your application and configure it according to your needs. Below is an example of how to set up `fib-launch`:

```javascript
const launch = require('fib-launch');

const options = {
    label: 'com.example.myapp',
    script: 'path/to/your_script.js'
};

launch.register(options);
```

### Configuration

While `fib-launch` does not require a specific configuration file, it is recommended to store your configuration in a JSON file for ease of management. An example configuration might look like this:

```json
{
    "startAtLogin": true
}
```

You can load this configuration in your application as follows:

```javascript
const fs = require('fs');
const path = require('path');

const configPath = path.join(require('os').homedir(), '.fib-launch', 'config.json');
let config = {};

if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const options = {
    label: 'com.example.myapp',
    script: 'path/to/your_script.js',
    ...config
};

launch.register(options);
```

### Unregistering Applications

If you need to unregister an application from starting at login, you can use the `unregister` method provided by `fib-launch`. Below is an example of how to unregister an application:

```javascript
const launch = require('fib-launch');

const options = {
    label: 'com.example.myapp'
};

launch.unregister(options);
```

By following these instructions, you can effectively manage the automatic launching of applications on system startup using `fib-launch`.

### Enhancing User Experience with System Tray

Although `fib-launch` itself does not provide system tray functionality, you can enhance your application's user experience by integrating it with a system tray using a GUI module. Below is an example of how to set up a system tray using the `gui` module:

```javascript
const gui = require('gui');
const path = require('path');

const tray = gui.createTray({
    icon: path.resolve(__dirname, 'icon.png'),
    menu: [
        {
            label: 'Open GitHub',
            onclick: function () {
                gui.open('https://github.com/fibjs');
            }
        },
        {
            label: 'Start at login',
            checked: config.startAtLogin,
            onclick: function () {
                config.startAtLogin = this.checked;
                save_config();

                if (config.startAtLogin)
                    launch.register(launch_config);
                else
                    launch.unregister(launch_config);
            }
        },
        {
            label: 'Exit',
            onclick: function () {
                process.exit();
            }
        }
    ]
});
```

By following these instructions, you can effectively manage the automatic launching of applications on system startup using `fib-launch` and enhance the user experience with system tray integration.

### Platform-Specific Details

`fib-launch` provides a unified interface for managing startup applications across different operating systems. However, the underlying implementation varies depending on the platform. Below are the platform-specific details for Windows, macOS, and Linux.

#### Windows

On Windows, `fib-launch` uses the Windows Registry to manage startup applications. Specifically, it interacts with the `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run` registry key. When an application is registered to start at login, an entry is added to this registry key with the application's name and the path to the executable or script. This ensures that the application is launched automatically when the user logs in.

**Key Characteristics:**
- **Registry-Based**: Uses the Windows Registry for startup management.
- **User-Specific**: Entries are added under `HKEY_CURRENT_USER`, making them specific to the logged-in user.
- **Executable Path**: The registry entry contains the path to the executable or script to be run at startup.

#### macOS

On macOS, `fib-launch` leverages Launch Services to manage startup applications. This involves creating a property list (plist) file in the `~/Library/LaunchAgents` directory. The plist file contains key information such as the label, program arguments, and run conditions. When the user logs in, Launch Services reads the plist file and starts the specified application.

**Key Characteristics:**
- **Plist-Based**: Uses property list files for configuration.
- **User-Specific**: Plist files are stored in the user's `~/Library/LaunchAgents` directory.
- **Flexible Configuration**: Plist files allow for detailed configuration, including environment variables and run conditions.

#### Linux

On Linux, `fib-launch` uses the `~/.config/autostart` directory to manage startup applications. It creates a desktop entry file (with a `.desktop` extension) in this directory. The desktop entry file follows the XDG Autostart specification and includes fields such as `Name`, `Exec`, and `Type`. When the user logs in, the desktop environment reads the desktop entry file and starts the specified application.

**Key Characteristics:**
- **Desktop Entry-Based**: Uses `.desktop` files for configuration.
- **User-Specific**: Desktop entry files are stored in the user's `~/.config/autostart` directory.
- **Standardized Format**: Follows the XDG Autostart specification, ensuring compatibility with various desktop environments.

### Differences and Characteristics

- **Implementation Method**: Windows uses the registry, macOS uses plist files, and Linux uses desktop entry files.
- **Configuration Location**: Windows stores configuration in the registry, macOS in `~/Library/LaunchAgents`, and Linux in `~/.config/autostart`.
- **User-Specific Management**: All platforms manage startup applications on a per-user basis, ensuring that configurations are specific to the logged-in user.
- **Flexibility**: macOS and Linux offer more flexible configuration options through plist and desktop entry files, respectively, allowing for detailed startup conditions and environment settings.

By understanding these platform-specific details, you can effectively manage the automatic launching of applications on system startup using `fib-launch` across different operating systems.

## Contributing

We welcome contributions to `fib-launch`. If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request on our GitHub repository.

## License

`fib-launch` is licensed under the ISC License. See the LICENSE file for more details.

## Acknowledgements

We would like to thank the open-source community for their contributions and support.








