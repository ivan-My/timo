#! /usr/bin/env node

const { spawn } = require('child_process')
const colors = require('colors/safe');
const pbk = require('../package.json')

function run() {
    console.log(colors.green(`Timo ${pbk.version}`));
    const args = process.argv.slice(2)
    const filePath = args[0]
    const targetName = args[1]
    if (args.length == 0) {
        console.log(colors.red('\n请提供输入、输出的参数'));
        return
    }

    if (filePath.endsWith('ts')) {
        let argsArr = filePath.split('\/')
        argsArr[argsArr.length - 1] = targetName + '.mp4'
        const targetPath = argsArr.join('\/')
        console.log(colors.green(`输入----${filePath}\n输出----${targetPath}`));
        tsForMp4(filePath, targetPath)
    }
}

function tsForMp4(filePath, targetPath) {
    const child = spawn('ffmpeg', ['-i', filePath, '-codec', 'copy', targetPath],
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

run()




