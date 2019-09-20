# Templates

In this section, We will be covering the following topics:

- Template breakdown
- Making a new template
- Creating a new template
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

`.tpsrc` is your settings file for these templates. They allow you to alter the way TPS runs and more. `.tpsrc` will be more described in (rcfile)(TODO)

    | - .tps/
        | - .tpsrc

### Example

In this example I created a directory called `react-component` inside of my `.tps` directory. This now can be referred to a `react component template`.

    | - .tps/
        | - .tpsrc
        | - react-componet/

### Template layout

Now lets break down how and what to put stuff into your template folder. Inside of each `template` you can have directories referred to as `packages`.

    | - <template>/
        | - <packages...>

A template can also have a optional settings file.

    | - <template>/
            | - settings.json

The settings file will be talked about more, in detail, later down the line in this guide.

> [Settings file guide](./settings/index.md)

`packages` can be named whatever you like except for one. Each `template` can have a `default` package like the following example:

    | - <template-folder>/
        | - settings.json
        | - default
        | - <packages...>

Each time you generate a template, TPS will automatically compile everything inside your default package, unless told not to. Every other package that you want to be rendered must be specified when generating the template.

TODO:

The `settings.json` file is your own configurations that will affect the behavior when generating that template. This file is where you can put prompts and etc. More about how this file works will be discussed in the [Settings Guide](./settings.md)

Now inside of each `package` folder. You can add as many files and directories as you want and these are what will be used when generating your template.

### Dynamic files

Each `package` has the power to use dynamic files. Files are considered dynamic files when they have a `.dot` extension appended to the end of it. These files allow you to use all features of [doT](http://olado.github.io/doT/index.html)
 inside of TPS.

Your probably wondering right now. How do I pass data so these files can be dynamic? There are many ways on how to pass data to your templates during generation time. But this is out of the scope of this section. Learn more about passing data into TPS [here](TODO)

## Making a new template

There is nothing special about a template. All it is nothing but files and folders. We could create a template two ways:

1. just create the files and directories with `mkdir/touch` or use Finder etc.

2. Use our command line tool

For this example we will be creating a `hello-world` template inside of our `tps-example` repo

### option one

```bash
cd path/to/tps-example/

mkdir .tps/hello-world

mkdir .tps/hello-world/default
```

### option two

```bash
cd path/to/tps-example

tps new template hello-world
```

Now lets add a file to `tps-example/.tps/default`

```bash
echo 'console.log("hello world")' > .tps/default/index.js
```

Thats it! You have your first template.

> See how to use our `new` command more [here](../../cli/commands/new.md)

## Creating a new template

Now lets see your new template in use. To create a new template use the following command.

```bash
tps create --use=hello-world firstTemplate

# or

tps hello-world firstTemplate
```

This should create a folder called `firstTemplate` inside of `tps-example` like so:

    | - tps-example/
        | - src/
        | - .tps/
            | - ...
        | - firstTemplate/ <-- template you just created
            | - index.js

[Prev](./prerequisites.md)
[Next](./packages.md)

<!--
#### Examples:

lets take this `hello-world` template as a example.

    | - tps-example
        | - .tps/
            | - hello-world/
                | - default/
                    | - hello.js
                    | - world.js.dot _(this is a dynamic file)_
                    | - utils
                        | - index.js

Now after generating this template with this command

We should get a new generated template called `tps-template`. Our folder structure should now look like

    | - tps-example
        | - .tps/
            | - ...
        | - tps-template/
            | - hello.js
            | - world.js
            | - utils
                | - index.js

Notice how the structure of `tps-template` resembles everything that lived in `.tps/hello-world/default`. The only difference is the `world.js` file which was `world.js.dot`. The dot extension only tells TPS to render this file dynamically -->
