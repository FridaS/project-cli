#!/usr/bin/env node
const Commander = require('commander')
const CreateProject = require('../lib/utils/create-project')
const CreateModule = require('../lib/utils/create-module')

Commander
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('project <name> [type]')
    .description('创建工程, 其中type可设置为: spa-单页应用(默认), mpa-多页应用')
    .action((name, type = 'spa') => {
        CreateProject(name, type)
    });
Commander
    .command('module <name>')
    .description('创建子模块')
    .action((name) => {
        CreateModule(name)
    });

Commander.parse(process.argv);