const AwsSamPlugin = require("aws-sam-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { pathToFileURL } = require("url");

const awsSamPlugin = new AwsSamPlugin();
const copyPlugin = new CopyPlugin({
  patterns: [
    { from: "src/producer/package.json", to: "ProducerFn/package.json" },
    { from: "src/consumer/package.json", to: "ConsumerFn/package.json" },
  ],
});

module.exports = {
    // Loads the entry object from the AWS::Serverless::Function resources in your
    // template.yaml or template.yml
    entry: awsSamPlugin.entry(),

    // Write the output to the .aws-sam/build folder
    output: {
        filename: "[name]/app.js",
        libraryTarget: "commonjs2",
        path: __dirname + "/.aws-sam/build/"
    },

    // Create source maps
    devtool: "source-map",

    // Resolve .ts and .js extensions
    resolve: {
        extensions: [".ts", ".js"]
    },

    // Target node
    target: "node",

    // Includes the aws-sdk only for development. The node10.x docker image
    // used by SAM CLI Local doens't include it but it's included in the actual
    // Lambda runtime.
    externals: process.env.NODE_ENV === "development" ? [] : ["aws-sdk"],

    // Set the webpack mode
    mode: process.env.NODE_ENV || "production",

    // Add the TypeScript loader
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },

    // Add the AWS SAM Webpack plugin
    plugins: [
        awsSamPlugin,
        copyPlugin
    ]
}