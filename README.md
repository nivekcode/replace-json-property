# replace-json-property
This module allows you to replace a specific property in a JSON.
You can use this via the following command:

```
replace-json-property pathToFile property value
```
You can always run the help command to see how the signature looks
```
replace-json-property -h
```
or

```
replace-json-property --help
```
To get the current version use the --verion or -v command.

## Example
Let's say we have the following JSON called test.json:
```
{
    foo: 'bar'
}
```
To replace foo with 'test' we can simply run the following command
```
replace-json-property ./test.json foo test,
```
this results in the following JSON:
```
{
    foo: 'test'
}
```

## Short form
All commands explained above can also be run with the shortcut version `rjp`.
```
rjp ./test.json foo test,
```
