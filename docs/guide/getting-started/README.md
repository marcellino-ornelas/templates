# Templates

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Template breakdown](#template-breakdown)
  - [Where do templates live](#where-do-templates-live)
  - [Packages](#packages)
  - [Settings file](#settings-file)
- [Making a new template](#making-a-new-template)
  - [bash commands](#bash-commands)
  - [tps cli](#tps-cli)
- [Rendering a new template](#rendering-a-new-template)
  - [what is rendering a template](#what-is-rendering-a-template)
  - [how to render a template](#how-to-render-a-template)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> We will be referring to `<some-name>` in our guide to represent any directory.

## Intro

Templates is a filesystem generator aimed at making it easier to getting started and/or maintaining code applications. Templates purpose is to give developers a friendly tool that helps them do their common day to day workflows. Now templates can be used for variety of workflows like:

- Creating a web application in any language.
- Creating new sections in your project, like a new web controller with unit tests or a react component with redux or typescript or both
- Creating docs. _(fun fact: these docs are written with templates)_

The possibilities are endless with templates. 

You can sort of think of templates as a function but for your filesystem. When your coding you can easily copy and paste code all over the place but that would be messy and unmaintainable right? Instead you can put all your logic/code into a function so its defined in one spot but can be used over and over again with different arguments. Thats nice for code but what about when you create a new react component in your web application, or a new controller for your api? Well you'll probably start off by manually creating a file, opening up a similar file to copy and paste the parts you need because chances are your not gonna remember how to build it from scratch right away or without looking it up. What about if you need to do this for 2? 3? files for one piece of your app to work? or add some unit tests? Wouldn't it be nice just to press a button, plug some info in then BAM! you now have a working component or controller ready plug in and use? This is where templates comes into play! 

## Template breakdown

A tps template is a collection of folders and files that will be used to create an similar like file structures somewhere else. You can think of this like a copy and paste. When tps renders a `template`, it will read all of the files/directories inside of that `template` folder, then make a copy of all of them in another directory of your choosing.

Tps also allows you to pass in extra information when rendering a template to make your template more dynamic. This [dynamic topic](./dynamic-files.md) is talked about later in this guide.

### Where do templates live

All TPS templates need to live in a `.tps` folder. Sub directories of the `.tps` folder are referred to are your `templates`. You may have as many templates as you wish.

    | - .tps/
        | - <template...>/

<!-- `.tpsrc` is your settings file for these templates. They allow you to alter the way TPS runs and more. `.tpsrc` will be more described in [rcfile](TODO)

    | - .tps/
        | - .tpsrc -->

#### Example

If I were to make a new template called `react-component` then my folder structure would look like this:

> TPS_TERM: we would refer to this as a `react component template`.

    | - .tps/
        | - react-componet/

### Packages

Now lets break down what to put in your template folder. Inside of each `template` you can have directories referred to as `packages`.

    | - .tps/
        | - <template>/
            | - <packages...>/

Now inside of each `package` directory . You can add as many files and directories as you want. These are what will be used when rendering a template. `packages` can be named whatever you like except for one. Each `template` can have a `default` package but its not required.

Each time you render a template, TPS will automatically use everything inside your `default` package to build your template. Every other package that you want to be rendered must be specified when rendering the template.

#### Example

If we were rendering a new template called `app`, then tps will create a directory named `app` and put of the contents from your `default` package and place it into `app`.

    | - .tps/
        | - <template>/
            | - default/
                | - <your files/folders>

    | - app/
        | - <your of the files/folders from default package>

There are some exceptions but packages will be talked about more, in detail, on the next page of this guide.

> [Packages guide](./packages.md)

### Settings file

    | - <template>/
            | - settings.json

A template can also have a optional settings file. This is you will place all of the templates prompts and more. The settings file will be talked about more, in detail, later down the line in this guide.

> [Settings file guide](./settings/README.md)

<!-- ### Dynamic files

Each `package` has the power to use dynamic files. Files are considered dynamic files when they have a `.dot` extension appended to the end of it. These files allow you to use all features of [doT](http://olado.github.io/doT/index.html)
 inside of TPS.

Your probably wondering right now. How do I pass data so these files can be dynamic? There are many ways on how to pass data to your templates during generation time. But this is out of the scope of this section. Learn more about passing data into TPS [here](TODO) -->

## Making a new template

There is nothing special about a template. Its nothing other than a directory holding a collection of files and folders. We could create a template two ways:

1. Create the directories and files with `mkdir/touch` or use Finder etc.

2. Use our command line tool

> Read more about our command line docs [here](../command-line/readme.md)

### bash commands

```bash
mkdir .tps/<template-name>

mkdir .tps/<template-name>/default
```

### tps cli

Our command line tools will create the `default` folder for you.

```bash
tps new template <template-name>
```

> See how to use our `new` command more [here](../../api/cli/commands/new.md)

## Rendering a new template

### what is rendering a template

Rendering a new template is the term we refer to when someone would like to take the file and folders from your template folder and "copy and paste them" to a different location.

    + - - - - - - - +    + - - - - - - - - - +    + - - - - - - - - - - +    + - - - - - - - - - - - - -+
    | Tps gets path |    | loads all files & |    | creates a new       |    | creates each file &      |
    | to template   | -> | folders for each  | -> | directory from the  | -> | folder from the packages |
    + - - - - - - - +    | package passed in |    | locations passed in |    | in each new directory    |
                         + - - - - - - - - - +    + - - - - - - - - - - +    + - - - - - - - - - - - - -+

The "location" that you pass in to tell tps where to render the new template to are referred to as a `build path`. You can kind of think of the build path as the name of the new template being created. tps will get this build path and create a directory with that name and copy all of the files & folders from your templates packages into that new directory.

The build path could can either be a single word or a file system like path like so:

    app
    |__|
     ^ Build path

or with a path

    some/path/app
    |____________|
     ^ Build path

Now when the build path is just a single word then the build path is also the name of the new template being created. This name is used to create the name of the new directory. If I passed in `app` as the build path then a directory app will be created and all of the templates files & folders will be placed into `app`.

        | - app/
            | - <all-of-the-template-files...>

But when the build path has a long path attached, only the end word is the name of the template.

    some/path/app
             |___|
               ^ name of template

The rest of the path is used as an additional location when rendering the template. So if you passed in `some/path/app` then `app` will be created in the `some/path` directory. If the directory doesn't exist it will be created.

        | - some/
            | - path/
                | - app/
                    | - <all-of-the-template-files...>

You can also pass in multiple build paths at the same time. This is going to be the same as passing in one but for each one.

### how to render a template

There are two ways on how to render a template. One is via our command line tool or by our `node_module` package. We wont go deep into this topic right now but here are some basics.

`<template-to-use>` is the name of the template you would like to use.

> Not sure what templates you have? Check out our [list command](../../api/cli/list.md)

`<build-paths...>` is the location/name of where you want your new rendered template to go

#### tps cli tools

```bash
# create command

tps create --use=<template-to-use> <build-paths...>

# or use command

tps <template-to-use> <build-paths...>
```

##### Examples

###### one build path

```bash
# create command

tps create --use=express-template app

# or use command

tps express-template app
```

###### build path with long path

```bash
# create command

tps create --use=express-template projects/app

# or use command

tps express-template projects/app
```

###### multiple build path

```bash
# create command

tps create --use=express-template app project/app app2

# or use command

tps express-template app project/app app2
```

> See how to use our `create` command more [here](../../api/cli/commands/create.md)

#### node module

```js
const Templates = require('tps');

const tps = new Templates('<template-to-use>');
// ^ In js pass in the name to the template here

const buildPaths = ['<build-paths...>'];
// ^ In js build paths should always be an array

tps.render('<some-directory-path>', buildPaths);
//          ^ In js we need to add a path to some directory so tps has a
//            starting directory. tps cli tools uses this node module
//            underneath the hood and uses the terminals current working
//            directory as the `<some-directory-path>` path
```

##### Examples

###### one build path

```js
const Templates = require('tps');

const tps = new Templates('express-template');

const buildPaths = ['app'];

tps.render(process.cwd(), buildPaths);
```

###### build path with long path

```js
const Templates = require('tps');

const tps = new Templates('express-template');

const buildPaths = ['projects/app'];

tps.render(process.cwd(), buildPaths);
```

###### multiple build path

```js
const Templates = require('tps');

const tps = new Templates('express-template');

const buildPaths = ['app', 'projects/app', 'app2'];

tps.render(process.cwd(), buildPaths);
```

## Example

Lets create our first template together. For this example we will be creating a template that generates a `index.js` file for us that, if ran it will print out "hello world". Easy right? Lets do this...

First change your cwd into our `tps-example` folder.

```bash
cd path/to/tps-example
```

Next create a template called `hello-world`.

```bash
tps new template hello-world
```

This will create a `hello-world` directory inside of the `tps-example/.tps` directory. Inside of that directory, will be a `default` folder.

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

```js
console.log('hello world');
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

[Back](../README.md)
[Next](./packages.md)
