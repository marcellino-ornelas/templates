<span id="default-packages-example"></span>

#### Default Packages

As mentioned earlier create-components-react has default packages that it renders these default packages are index, component, css.

---

<span id="custom-package-example"></span>

### Custom Packages

You can create custom packages to add when generating you components. These packages can have directories and/or dot files for rendering inside. Each directory( even nested ones!) and all files will be made to the destination.
Inside of your package folder you can create a file(s) and/or directory(s). Each file inside that you would like to have processed with doT should include a `.dot` extention at the end of the file.

If the only extention to your file is a `.dot` extention then will be rendered as a `.js` file. If you would like to have another type of extention include it before the `.dot` extention.

To use custom packages use the `-p` flag while creating a component. The `-p` or `--packages` flag takes a colon separated list of package names.

Example:

```bash
ccr create -p storage:view:container App
```

This command will Create an App component with custom storage, view, and container packages.

#### examples

To add your own custom packages. Create a folder inside the `templates/` folder. The name can be anything you want but its important to remember that this name is what the package is gonna be called.

In this example we are going to create a `storage` package that will help us create a mobx store. Create A folder called `storage`. Next create a file called `{{= it.component.name }}Storage.dot`.

    RepoFolder/
    | - .ccr/
        | - templates/
            | - component/
            | - index/
            | - functional/
            | - style/
            | - test/
            |
            | - storage/
            |   |- storage.dot
            |
            | - settings.json

Inside of `storage/{{= it.component.name }}Storage.dot` add the following code.

```javascript
    import { observable } from "mobx"

    class {{= it.component.name  }}Storge {
        // @observable
        // @computed get
    }

    export default {{= it.component.name  }}Storge;
```

Now create a component with our additional package. Execute this line in your command line.

    ccr create -p storage App

This will create:

    App/
    |
    | - App.js
    | - App.css
    | - index.js
    | - AppStorage.js

To get alittle more fancy we can change some behavior from other file when certain packages are used. Open `templates/component/{{= it.component.name }}.dot`. You can add this line inside your file to have dynamic capabilies when generating a component with a certain package.

```javascript
    {{? it.packages.storage }}
    import {observer} from 'mobx-react';
    {{?}}
```

now when you call:

```bash
ccr create -p storage Nav
```

Our nav component should have render the import statement for mobx.
