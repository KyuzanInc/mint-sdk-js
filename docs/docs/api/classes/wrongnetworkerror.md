---
id: "wrongnetworkerror"
title: "Class: WrongNetworkError"
sidebar_label: "WrongNetworkError"
custom_edit_url: null
hide_title: true
---

# Class: WrongNetworkError

ネットワークが正しくない

## Hierarchy

* *BaseError*

  ↳ **WrongNetworkError**

## Constructors

### constructor

\+ **new WrongNetworkError**(`e?`: *string*): [*WrongNetworkError*](wrongnetworkerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`e?` | *string* |

**Returns:** [*WrongNetworkError*](wrongnetworkerror.md)

Defined in: [src/Errors.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/17cac11/src/Errors.ts#L1)

## Properties

### message

• **message**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Optional` `Static` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:4
