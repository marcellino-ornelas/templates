# Templates

In this section, We will be covering the following topics:


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Template breakdown](#template-breakdown)
  - [Packages](#packages)
  - [Settings file](#settings-file)
- [Making a new template](#making-a-new-template)
  - [bash commands](#bash-commands)
  - [tps cli](#tps-cli)
- [Rendering a template](#rendering-a-template)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


  <!-- In this guide I will show you how to use the very basics of tps. -->

We will be using the following repo for all examples:

    | - tps-example/
        | - src/
        | - .tps/
            | - .tpsrc

> We will be referring to `<some-name>` in our guide to represent any directory.

## Template breakdown

All TPS templates need to live in a `.tps` folder. The child directories inside of `.tps/` are referred to as `template`. You may have as many `template` as you wish.

    | - .tps/
        | - <template...>/

`.tpsrc` is your settings file for these templates. They allow you to alter the way TPS runs and more. `.tpsrc` will be more described in [rcfile](TODO)

    | - .tps/
        | - .tpsrc

#### Example

In this example I created a directory called `react-component` inside of my `.tps` directory. This now can be referred to a `react component template`.

    | - .tps/
        | - .tpsrc
        | - react-componet/

### Packages

Now lets break down how and what to put stuff into your template folder. Inside of each `template` you can have directories referred to as `packages`.

    | - <template>/
        | - <packages...>/

Now inside of each `package` directory . You can add as many files and directories as you want and these are what will be used when rendering a template. `packages` can be named whatever you like except for one. Each `template` can have a `default` package like the following example:

    | - <template>/
        | - default/

Each time you render a template, TPS will automatically use everything inside your default package to build your template, unless told not to. Every other package that you want to be rendered must be specified when generating the template.

Packages will be talked about more, in detail, on the next page of this guide.

> [Packages guide](./packages.md)

### Settings file

A template can also have a optional settings file.

    | - <template>/
            | - settings.json

The settings file will be talked about more, in detail, later down the line in this guide.

> [Settings file guide](./settings/README.md)

<!-- ### Dynamic files

Each `package` has the power to use dynamic files. Files are considered dynamic files when they have a `.dot` extension appended to the end of it. These files allow you to use all features of [doT](http://olado.github.io/doT/index.html)
 inside of TPS.

Your probably wondering right now. How do I pass data so these files can be dynamic? There are many ways on how to pass data to your templates during generation time. But this is out of the scope of this section. Learn more about passing data into TPS [here](TODO) -->

## Making a new template

There is nothing special about a template. Its nothing other than a directory holding a collection of files and folders. We could create a template two ways:

1. Create the directories and files with `mkdir/touch` or use Finder etc.

2. Use our command line tool

> Read our command line docs [here](../command-line/readme.md)

### bash commands

```bash
mkdir .tps/<template-name>

mkdir .tps/<template-name>/default
```

### tps cli

```bash
tps new template <template-name>
```

> See how to use our `new` command more [here](../../api/cli/commands/new.md)

## Rendering a template

To render a template use the following command.

```bash
tps create --use=<template-to-use> <template-name-to-create>

# or

tps <template-to-use> <template-name-to-create>
```

## Example

Lets create our first template together. For an example this template will create a js file for use and when run it will console log "hello world". Easy right? Lets do this...

First change your cwd into our `tps-example` folder.

```bash
cd path/to/tps-example
```

Next create a template called `hello-world`.

```bash
tps new template hello-world
```

This will create a `hello-world` directory inside of the `tps-example/.tps` directory.

    | - tps-example/
        | - .tps/
            | - hello-world/
                | - default

Next add a `index.js` file into `tps-example/.tps/hello-world/default`.

```bash
echo "console.log('hello world')" > .tps/hello-world/default/index.js
```

Our `tps-example` should now resemble this folder structure

    | - tps-example/
        | - .tps/
            | - hello-world/
                | - default
                    | - index.js

Now to create this template call this command.

```bash
tps hello-world firstTemplate
```

This should create a folder called `firstTemplate` inside of `tps-example` like so:

    | - tps-example/
        | - .tps/
            | - ...
        | - firstTemplate/ <-- template you just created
            | - index.js

Now if we:

```bash
cat firstTemplate/index.js
```

well get.

```
console.log('hello world')
```

<!-- ## Real world Example

Im personally, a node developer. So this example will be about creating an express app template. Now with every express app there is certain files and directories structure that will be common with all express apps. So we will be building a simple express app template.

Now lets say somewhere on your computer you have a directory where you put all of your personal node projects. like a folder called `development`. Create this `development` anywhere on your computer to follow along but all example will be from within the development folder

Now change your directory to development

```bash
cd path/to/development
```

Lets init tps in this directory.

```bash
tps init
```

Now lets add a file to `tps-example/.tps/express-server/default`. -->

[Prev](./README.md)
[Next](./packages.md)
