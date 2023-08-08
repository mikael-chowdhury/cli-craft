rm -fr dist/* && tsc -p tsconfig.json && tsc -p tsconfig-cjs.json

mkdir ./dist/cjs/types
mkdir ./dist/mjs/types

cp ./src/types.d.ts ./dist/cjs/types.d.ts
cp ./src/types.d.ts ./dist/mjs/types.d.ts

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF