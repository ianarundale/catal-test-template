var config = module.exports;

config["Browser tests"] = {

    autoRun: false,
    rootPath: "./",

    environment: "browser", // or "node"
    sources: [
        "script/models/*.js",
        "script/**/*.js"
    ],
    tests: [
        "script-test/tests/*-test.js"
    ],
    extensions: [require("buster-amd")],
    libs: [
        "config.js",
        "require.js"

    ]
}

// Add more configuration groups as needed
