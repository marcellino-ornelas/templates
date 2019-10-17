## Prerequisites

Make sure you have tps installed globally.

> See installation steps [here](../../../../../readme.md#installation)

Next anywhere on your laptop. Add a new directory called `tps-example`. After creating the directory add the following files and directories inside of `tps-example` so it resembles this folder structure.

    | - tps-example/
        | - src/

Open a terminal and change your directory to `tps-example`.

```bash
cd path/to/tps-example
```

Next run:

```bash
tps init
```

This should create a `.tps` folder inside of your `tps-example` directory. Now you should end up with this:

    | - tps-example/
        | - src/
        | - .tps/
            | - .tpsrc

Don't worry about `.tpsrc` for now we will touch on this file a little more down the guide.

> This repo will be used in every example through this guide

[Prev](./README.md)
[Next](./templating/README.md)
