# Creating files

In this guide I will show you how to use the very basics of tps.

## Prerequisites

Make sure you have tps installed globally.

Next anywhere on your laptop. Add a new folder called `tps-training`. After creating the folder add the following files and directorys inside of `tps-training` so it resembles this folder structure.

    | - tps-training/
        | - src/

Open a terminal and change your directory to `tps-training`.

```bash
cd path/to/tps-training
```

Next run:

```bash
tps init
```

This should create a `.tps` folder inside of your `tps-training` directory. Now you should end up with this:

    | - tps-training/
        | - src/
        | - .tps/
            | - .tpsrc

Don't worry about `.tpsrc` for now we will touch on this file a little more down the guide.

[Prev](./folder-structure.md)
[Next](./dynamic-files.md)
