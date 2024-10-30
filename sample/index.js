const gui = require("gui");
const path = require("path");
const fs = require("fs");
const os = require("os");

const launch = require("../");

const wins = {};
var config = {
    "startAtLogin": true,
    "window": {}
};

const appname = "fib-launch";

try {
    fs.mkdir(path.resolve(os.homedir(), `.${appname}`), {
        recursive: true
    });

    config = {
        ...config,
        ...JSON.parse(fs.readFileSync(path.resolve(os.homedir(), `.${appname}`, "config.json")))
    }
} catch (e) { }

function save_config() {
    fs.writeFile(path.resolve(os.homedir(), `.${appname}`, "config.json"), JSON.stringify(config, null, 4));
}

save_config();

const launch_config = {
    label: appname,
    script: __filename
}

if (config.startAtLogin)
    launch.register(launch_config);

const tray = gui.createTray({
    icon: path.resolve(__dirname, "icon.png"),
    menu: [
        {
            label: "github",
            onclick: function () {
                if (wins.github) {
                    wins.github.show();
                    wins.github.active();
                }
                else {
                    wins.github = gui.open("https://github.com/fibjs", {
                        left: config.window.left,
                        top: config.window.top,
                        width: config.window.width,
                        height: config.window.height,
                        hideOnClose: true,
                        onmove: function (ev) {
                            config.window.left = ev.left;
                            config.window.top = ev.top;
                            save_config();
                        },
                        onresize: function (ev) {
                            config.window.width = ev.width;
                            config.window.height = ev.height;
                            save_config();
                        }
                    });
                }
            }
        },
        {},
        {
            label: "Start at login",
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
        {},
        {
            label: "Exit",
            onclick: function () {
                tray.close();
                if (wins.github)
                    wins.github.close();
            }
        }
    ]
});
