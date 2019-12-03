## Prerequisites Guides

Hello and welcome!

Our user guides will have tons of examples demonstrating how to use templates. Although Templates can be used in two way, via command line or via a node module, our user guides will show most examples via the command line using our command line tools. If you don't already have templates globally installed, checkout out our installation section [here](../../readme.md#installation)

### Following our getting started guide?

The following steps are used purposely for our user guides. These steps will help set up a local development spot on our computer so you can work through the examples in our guides.

> The below are not required to use our guides.

Next anywhere on your laptop. Preferably your `desktop` folder but any will do. Add a new directory called `tps-example`. After creating the directory add the following files and directories inside of `tps-example` so it resembles this folder structure.

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

[Next: Getting Started](./getting-started/README.md)

[Back](./README.md)
