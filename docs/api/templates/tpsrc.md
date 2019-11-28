# tpsrc API

All possible fields you can add to tpsrc.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [extendDest](#extenddest)
- [answers](#answers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


For examples and more see our getting started [tps guide](../../guide/getting-started/tpsrc.md)

## extendDest

#### Usage

Field: `extendDest`

Type: `string`

#### Description

Add an addition relative path to add on to the location you want to send the template to.

#### Example

```json
{
  "<template-name>": {
    "extendDest": "./path/to/dir"
  }
}
```

## answers

#### Usage

Field: `answers`

Type: `Object<string, any>`

#### Description

Add predefined answers for prompts. When you have an answer to a prompt here, the prompt will not be asked to the user but will take the value from this property. The answer of a prompt can be any valid javascript data type.

#### Example

```json
{
  "<template-name>": {
    "answers": {
      "<prompt-name>": "<prompt-answer>"
    }
  }
}
```
