#!/usr/bin/env node
import { Command } from 'commander';
import CreateProject from '../lib/utils/create-project';
import CreateModule from '../lib/utils/create-module';
import { version } from '../package.json';

const commander = new Command();

commander.version(version)
  .usage('<command> [options]')
  .command('project <name> [type]')
  .description('创建工程, 其中type可设置为: spa-单页应用(默认), mpa-多页应用')
  .action((name, type = 'spa') => {
    CreateProject(name, type);
  });
commander.command('module <name>')
  .description('创建子模块')
  .action((name) => {
    CreateModule(name);
  });

commander.parse(process.argv);
