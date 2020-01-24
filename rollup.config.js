import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author}`;

function onwarn(message, warn) {
    if (message.code === "CIRCULAR_DEPENDENCY") return;
    warn(message);
}

const baseConfig = {
    input: 'src/index.js',
    external: Object.keys(meta.dependencies),
};

const outputConfig = {
    name: meta.name,
    banner: copyright,
};

const pluginsConfig = targets => ([
    babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['@babel/env', { modules: false, targets }]],
        // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
        comments: false,
    }),
    resolve(),
    terser({output: {preamble: copyright}}),
]);

export default [Object.assign({}, baseConfig, {
    output: Object.assign({}, outputConfig, {
        file: `dist/${meta.name}.min.esm.js`,
        format: 'esm',
    }),
    plugins: pluginsConfig({ node: '8' }),
    onwarn,
}), Object.assign({}, baseConfig, {
    output: Object.assign({}, outputConfig, {
        extend: true,
        file: `dist/${meta.name}.min.js`,
        format: 'umd',
        indent: false,
        globals: Object.assign({}, ...Object.keys(meta.dependencies).map(key => ({[key]: key}))),
    }),
    plugins: pluginsConfig({ node: '6' }),
    onwarn,
})];
