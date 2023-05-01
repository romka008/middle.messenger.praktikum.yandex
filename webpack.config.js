const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = env => {
    const isDev = Boolean(env.development);
    const sourceMap = isDev;

    return {
        entry: "./src/index.ts",
        mode: isDev ? "development" : "production",
        devtool: sourceMap ? "inline-source-map" : false,
        target: ["web", "es5"],
        output: {
            filename: "[name].[fullhash].js",
            path: path.join(__dirname, "dist")
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./static/index.html",
                filename: "index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "./static/styles.css"
            })
        ],
        ...(isDev
            ? null
            : {
                  performance: {
                      hints: false,
                      maxEntrypointSize: 512000,
                      maxAssetSize: 512000
                  }
              }),
        optimization: {
            minimizer: [new CssMinimizerPlugin()]
        },

        resolve: {
            extensions: [".ts", ".js", ".hbs"]
        },

        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    use: [
                        {
                            loader: "handlebars-loader",
                            options: {
                                precompileOptions: {
                                    knownHelpersOnly: false
                                }
                            }
                        }
                    ],

                    exclude: /(node_modules)/
                },
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                },

                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"]
                },

                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "./img/[name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(ico)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "./[name].[ext]"
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
            hot: true,
            compress: true
        }
    };
};
