#! /usr/bin/env node

const { spawn } = require('child_process')
const colors = require('colors/safe');
const pbk = require('../package.json')

function run() {
    console.log(colors.green(`Timo ${pbk.version}`));

    const args = process.argv.slice(2)
    let inFileName = args[0]
    let outFileName = args[1]

    if (args.length < 2) {
        console.log(colors.red('\n请提供输入、输出的参数'));
        return
    }

    // if (outFileName.endsWith('.ts' || '.mp4')) {
    //     console.log(colors.red('\n请输入合法的输出格式'));
    //     return
    // }

    outFileName = toFilePath(inFileName, outFileName)

    console.log(colors.green(`输入----${inFileName}\n输出----${outFileName}`));
    remuxing(inFileName, outFileName)
}

function remuxing(filePath, outFileName) {
    const child = spawn('ffmpeg', ['-i', filePath, '-codec', 'copy', outFileName],
        {
            stdio: 'inherit',
            cwd: process.cwd()
        })
    child.on('error', e => {
        console.log(colors.red('\n ------转换失败------'));
        process.exit(1)
    })
    child.on('exit', e => {
        console.log(colors.red('\n ------转换成功------'));
        process.exit(e)
    })
}


function toFilePath(file, name) {
    let argsArr = file.split('\/')
    argsArr[argsArr.length - 1] = name
    return argsArr.join('\/')
}

run()




