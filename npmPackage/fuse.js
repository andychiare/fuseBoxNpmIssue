const { FuseBox, QuantumPlugin, EnvPlugin } = require("fuse-box");
const { src, task, context} = require("fuse-box/sparky");

const distFolder = "dist";
const bundleName = "index";
//const instructions = ">[index.js]";
const instructions = ">index.js";

context(class {
    getConfig() {
        let fuse = FuseBox.init({
            homeDir: "src",
            output: distFolder + "/$name.js",
            target : "browser@es5",
            useTypescriptCompiler : true,
            allowSyntheticDefaultImports : true,
            plugins: [
                EnvPlugin({ DEVELOPMENT: !this.isProduction}),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: bundleName,
                    //uglify: true,
                    containedAPI: true,
                    target: "npm",
                    treeshake : true
                })
            ],
            globals: {"default": "*"}
        });

        return fuse;
    }
    createAppBundle(fuse) {
        const app = fuse.bundle(bundleName);
        // if (!this.isProduction) {
        //     app.watch()
        //     app.hmr()
        // }
        app.instructions(instructions);
        return app;
    }
});

task("clean", () => src(distFolder).clean(distFolder).exec() )
task("copy-pkg", () => src("./package.json").dest(distFolder).exec() )

task("default", ["clean", "copy-pkg"], async context => {
    const fuse = context.getConfig();
    context.createAppBundle(fuse);
    await fuse.run();
});

task("dist", ["clean", "copy-pkg"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createAppBundle(fuse);
    await fuse.run();
});
