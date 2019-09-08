## Folder structure

### Basic layout

All TPS templates need to live in a `.tps` folder. The sub folders inside of `.tps/` are considered `template-folders`. This is where each all the template's files/directories are held. You may have as many `template-folders` as you wish.

`.tpsrc` is your settings file for these templates. They allow you to alter the way TPS runs and more. `.tpsrc` will be more described in (rcfile)(TODO)

    | - .tps/
        | - .tpsrc
        | - <template-folders...>/

### Template layout

Now lets break down how and what to put stuff into your template folder. Inside of each `template-folder` you will have directories called `packages` and an optional file called `settings.json`. These `packages` can be named whatever you like expect for one. Each `template-folder` should have a `default` package like the following example:

    | - <template-folder>/
        | - settings.json
        | - default
        | - <packages...>

Each time you generate a template, TPS will automatically compile everything inside your default folder, unless told not to. Every other package that you want to be rendered must be specified when generating the template.

The `settings.json` file is your own configurations that will affect the behavior when generating that template. This file is where you can put prompts and etc. More about how this file works will be discussed in the [Settings Guide](./settings.md)

Now inside of each `package` folder. You can add as many files and directories as you want and these are what will be used when generating your template.

### Dynamic files

Each `package` has the power to use dynamic files. Files are considered dynamic files when they have a `.dot` extension appended to the end of it. These files allow you to use all features of [doT](http://olado.github.io/doT/index.html)
 inside of TPS.

Your probably wondering right now. How do I pass data so these files can be dynamic? There are many ways on how to pass data to your templates during generation time. But this is out of the scope of this section. Learn more about passing data into TPS [here](TODO)

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

    tps hello-world tps-template

We should get a new generated template called `tps-template`. Our folder structure should now look like

    | - tps-example
        | - .tps/
            | - ...
        | - tps-template/
            | - hello.js
            | - world.js
            | - utils
                | - index.js

Notice how the structure of `tps-template` resembles everything that lived in `.tps/hello-world/default`. The only difference is the `world.js` file which was `world.js.dot`. The dot extension only tells TPS to render this file dynamically

[Prev](./index.md)
[Next](./dynamic-files.md)

<!-- Thats it! Easy as that! But wait that cant be all right? why not just create the files in the terminal? -->
