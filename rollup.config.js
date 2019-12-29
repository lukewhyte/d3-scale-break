// plugins that we are going to use
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author}`;

const baseConfig = {
    // source file / entrypoint
    input: 'src/index.js',
    // dependencies to be loaded externally instead of bundled
    external: Object.keys(meta.dependencies),
};

const outputConfig = {
    name: meta.name,
    banner: copyright,
    sourcemap: true,
};

// list of plugins used during building process
const pluginsConfig = targets => ([
    // use Babel to transpile to ES5
    babel({
        // ignore node_modules/ in transpilation process
        exclude: 'node_modules/**',
        // ignore .babelrc (if defined) and use options defined here
        babelrc: false,
        // use recommended babel-preset-env without es modules enabled
        // and with possibility to set custom targets e.g. { node: '8' }
        presets: [['@babel/env', { modules: false, targets }]],
        // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
        // removes comments from output
        comments: false,
    }),
    resolve(),
    terser({output: {preamble: copyright}}),
]);

export default [Object.assign({}, baseConfig, {
    // output configuration
    output: Object.assign({}, outputConfig, {
        file: `dist/${meta.name}.min.esm.js`,
        // format of generated JS file, also: esm, and others are available
        format: 'esm',
    }),
    // build es modules for node 8
    plugins: pluginsConfig({ node: '8' }),
}), Object.assign({}, baseConfig, {
    output: Object.assign({}, outputConfig, {
        file: `dist/${meta.name}.min.js`,
        // format of generated JS file, also: esm, and others are available
        format: 'cjs',
    }),
    // build common JS for node 6
    plugins: pluginsConfig({ node: '6' }),
})];