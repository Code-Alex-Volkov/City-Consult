module.exports = {
    syntax: "postcss-scss",
    plugins: [
        require("postcss-easy-import")({
            extensions: ".scss"
        }),
        require("autoprefixer"),
        require("postcss-advanced-variables"),
        require("postcss-nested"),
        require("cssnano")
    ]
};