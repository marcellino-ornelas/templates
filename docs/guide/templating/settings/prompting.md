# Prompting

In this section, We will be covering the following topics:

- What is Prompting?
- How to use Prompting?

## What is Prompting?

Prompting is used to get data from the user. Its exactly what you think it is. Threw the command line we will display a message to the asking for there response. There options can come in all forms.

Templates uses [inquirer](./TODO)
 to prompt for user responses.

## How to use Prompting?

In order to use prompting features. We need to add a settings file in our template folder. This settings file can be either an `settings.json` or `settings.js` file. This file needs to be placed in your template folder at the same level as your packages.

The setting file needs to be a valid json object or for a js file it needs to return a javascript object.

The object can take the following properties as arguments

### Prompting

####

**Field:** `prompts`
**Type:** `array`

### json

```json
{
  "prompts": []
}
```

### Javascript

```javascript
module.exports = {
  "prompts: []
}
```

## Example

Lets bring our react example back:

    | - tps-example
        | - .tps/
            | - react-component/
                | - default/
                    | - index.js.dot
                    | - {{=tps.name}}.js.dot
                    | - {{=tps.name}}.css
