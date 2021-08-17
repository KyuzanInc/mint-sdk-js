---
id: "wrongnetworkerror"
title: "Class: WrongNetworkError"
sidebar_label: "WrongNetworkError"
custom_edit_url: null
hide_title: true
---

# Class: WrongNetworkError

ユーザーのウォレットが接続しているネットワークが正しくない

## Hierarchy

* *BaseError*

  ↳ **WrongNetworkError**

## Constructors

### constructor

\+ **new WrongNetworkError**(`e?`: *string*): [*WrongNetworkError*](wrongnetworkerror.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `e?` | *string* |

**Returns:** [*WrongNetworkError*](wrongnetworkerror.md)

Inherited from: BaseError.constructor

Defined in: [src/Errors.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/Errors.ts#L1)

## Properties

### message

• **message**: *string*

Inherited from: BaseError.message

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Inherited from: BaseError.name

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: BaseError.stack

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `err` | Error |
| `stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Inherited from: BaseError.prepareStackTrace

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: BaseError.stackTraceLimit

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

| Name | Type |
| :------ | :------ |
| `targetObject` | *object* |
| `constructorOpt?` | Function |

**Returns:** *void*

Inherited from: BaseError.captureStackTrace

Defined in: node_modules/@types/node/globals.d.ts:4
