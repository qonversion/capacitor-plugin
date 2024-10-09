# qonversion-capacitor

Qonversion

## Install

```bash
npm install qonversion-capacitor
npx cap sync
```

## API

<docgen-index>

* [`syncHistoricalData()`](#synchistoricaldata)
* [`syncStoreKit2Purchases()`](#syncstorekit2purchases)
* [`purchaseProduct(...)`](#purchaseproduct)
* [`purchase(...)`](#purchase)
* [`updatePurchase(...)`](#updatepurchase)
* [`products()`](#products)
* [`offerings()`](#offerings)
* [`checkTrialIntroEligibility(...)`](#checktrialintroeligibility)
* [`checkEntitlements()`](#checkentitlements)
* [`restore()`](#restore)
* [`syncPurchases()`](#syncpurchases)
* [`identify(...)`](#identify)
* [`logout()`](#logout)
* [`userInfo()`](#userinfo)
* [`remoteConfig(...)`](#remoteconfig)
* [`remoteConfigList()`](#remoteconfiglist)
* [`remoteConfigListForContextKeys(...)`](#remoteconfiglistforcontextkeys)
* [`attachUserToExperiment(...)`](#attachusertoexperiment)
* [`detachUserFromExperiment(...)`](#detachuserfromexperiment)
* [`attachUserToRemoteConfiguration(...)`](#attachusertoremoteconfiguration)
* [`detachUserFromRemoteConfiguration(...)`](#detachuserfromremoteconfiguration)
* [`isFallbackFileAccessible()`](#isfallbackfileaccessible)
* [`attribution(...)`](#attribution)
* [`setUserProperty(...)`](#setuserproperty)
* [`setCustomUserProperty(...)`](#setcustomuserproperty)
* [`userProperties()`](#userproperties)
* [`setEntitlementsUpdateListener(...)`](#setentitlementsupdatelistener)
* [`collectAdvertisingId()`](#collectadvertisingid)
* [`collectAppleSearchAdsAttribution()`](#collectapplesearchadsattribution)
* [`setPromoPurchasesDelegate(...)`](#setpromopurchasesdelegate)
* [`presentCodeRedemptionSheet()`](#presentcoderedemptionsheet)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### syncHistoricalData()

```typescript
syncHistoricalData() => void
```

Call this function to sync the subscriber data with the first launch when Qonversion is implemented.

--------------------


### syncStoreKit2Purchases()

```typescript
syncStoreKit2Purchases() => void
```

iOS only
Contact us before you start using this function
Call this function to sync purchases if you are using StoreKit2 and our SDK in Analytics mode.

--------------------


### purchaseProduct(...)

```typescript
purchaseProduct(product: Product, options: PurchaseOptions) => Promise<Map<string, Entitlement>>
```

Make a purchase and validate it through server-to-server using Qonversion's Backend

| Param         | Type                         | Description                                  |
| ------------- | ---------------------------- | -------------------------------------------- |
| **`product`** | <code>Product</code>         | product to purchase                          |
| **`options`** | <code>PurchaseOptions</code> | additional options for the purchase process. |

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt;&gt;</code>

--------------------


### purchase(...)

```typescript
purchase(purchaseModel: PurchaseModel) => Promise<Map<string, Entitlement>>
```

Make a purchase and validate it through server-to-server using Qonversion's Backend.

| Param               | Type                       | Description                        |
| ------------------- | -------------------------- | ---------------------------------- |
| **`purchaseModel`** | <code>PurchaseModel</code> | necessary information for purchase |

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt;&gt;</code>

--------------------


### updatePurchase(...)

```typescript
updatePurchase(purchaseUpdateModel: PurchaseUpdateModel) => Promise<Map<string, Entitlement> | null>
```

Android only. Returns `null` if called on iOS.

Update (upgrade/downgrade) subscription on Google Play Store and validate it through server-to-server using Qonversion's Backend.

| Param                     | Type                             | Description                               |
| ------------------------- | -------------------------------- | ----------------------------------------- |
| **`purchaseUpdateModel`** | <code>PurchaseUpdateModel</code> | necessary information for purchase update |

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt; | null&gt;</code>

--------------------


### products()

```typescript
products() => Promise<Map<string, Product>>
```

Returns Qonversion products in association with Apple and Google Play Store Products.

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Product&gt;&gt;</code>

--------------------


### offerings()

```typescript
offerings() => Promise<Offerings | null>
```

Return Qonversion Offerings <a href="#object">Object</a>.

An offering is a group of products that you can offer to a user on a given paywall based on your business logic.
For example, you can offer one set of products on a paywall immediately after onboarding and another
set of products with discounts later on if a user has not converted.
Offerings allow changing the products offered remotely without releasing app updates.

**Returns:** <code>Promise&lt;Offerings | null&gt;</code>

--------------------


### checkTrialIntroEligibility(...)

```typescript
checkTrialIntroEligibility(ids: string[]) => Promise<Map<string, IntroEligibility>>
```

You can check if a user is eligible for an introductory offer, including a free trial.
You can show only a regular price for users who are not eligible for an introductory offer.

| Param     | Type                  | Description                               |
| --------- | --------------------- | ----------------------------------------- |
| **`ids`** | <code>string[]</code> | products identifiers that must be checked |

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, IntroEligibility&gt;&gt;</code>

--------------------


### checkEntitlements()

```typescript
checkEntitlements() => Promise<Map<string, Entitlement>>
```

You need to call the checkEntitlements method to check if a user has the required entitlement.

This method will check the user receipt and will return the current entitlements.

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt;&gt;</code>

--------------------


### restore()

```typescript
restore() => Promise<Map<string, Entitlement>>
```

Restores users purchases in your app, to maintain access to purchased content.
Users sometimes need to restore purchased content, such as when they upgrade to a new phone.

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt;&gt;</code>

--------------------


### syncPurchases()

```typescript
syncPurchases() => void
```

Android only. Does nothing if called on iOS.

This method will send all purchases to the Qonversion backend. Call this every time when purchase is handled
by your own implementation.

**Warning!**

This method works for Android only.
It should only be called if you're using Qonversion SDK in observer mode.

--------------------


### identify(...)

```typescript
identify(userID: string) => Promise<User>
```

Call this function to link a user to his unique ID in your system and share purchase data.

| Param        | Type                | Description                   |
| ------------ | ------------------- | ----------------------------- |
| **`userID`** | <code>string</code> | unique user ID in your system |

**Returns:** <code>Promise&lt;User&gt;</code>

--------------------


### logout()

```typescript
logout() => void
```

Call this function to unlink a user from his unique ID in your system and his purchase data.

--------------------


### userInfo()

```typescript
userInfo() => Promise<User>
```

This method returns information about the current Qonversion user.

**Returns:** <code>Promise&lt;User&gt;</code>

--------------------


### remoteConfig(...)

```typescript
remoteConfig(contextKey: string | undefined) => Promise<RemoteConfig>
```

Returns Qonversion remote config object by {@link contextKey} or default one if the key is not specified.
Use this function to get the remote config with specific payload and experiment info.

| Param            | Type                |
| ---------------- | ------------------- |
| **`contextKey`** | <code>string</code> |

**Returns:** <code>Promise&lt;RemoteConfig&gt;</code>

--------------------


### remoteConfigList()

```typescript
remoteConfigList() => Promise<RemoteConfigList>
```

Returns Qonversion remote config objects for all existing context key (including empty one).
Use this function to get the remote config with specific payload and experiment info.

**Returns:** <code>Promise&lt;RemoteConfigList&gt;</code>

--------------------


### remoteConfigListForContextKeys(...)

```typescript
remoteConfigListForContextKeys(contextKeys: Array<string>, includeEmptyContextKey: boolean) => Promise<RemoteConfigList>
```

Returns Qonversion remote config objects by a list of {@link contextKeys}.
Use this function to get the remote config with specific payload and experiment info.

| Param                        | Type                  | Description                                                                           |
| ---------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| **`contextKeys`**            | <code>string[]</code> | list of context keys to load remote configs for                                       |
| **`includeEmptyContextKey`** | <code>boolean</code>  | set to true if you want to include remote config with empty context key to the result |

**Returns:** <code>Promise&lt;RemoteConfigList&gt;</code>

--------------------


### attachUserToExperiment(...)

```typescript
attachUserToExperiment(experimentId: string, groupId: string) => Promise<void>
```

This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
Use this function to attach the user to the experiment.

| Param              | Type                | Description                        |
| ------------------ | ------------------- | ---------------------------------- |
| **`experimentId`** | <code>string</code> | identifier of the experiment       |
| **`groupId`**      | <code>string</code> | identifier of the experiment group |

--------------------


### detachUserFromExperiment(...)

```typescript
detachUserFromExperiment(experimentId: string) => Promise<void>
```

This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
Use this function to detach the user from the experiment.

| Param              | Type                | Description                  |
| ------------------ | ------------------- | ---------------------------- |
| **`experimentId`** | <code>string</code> | identifier of the experiment |

--------------------


### attachUserToRemoteConfiguration(...)

```typescript
attachUserToRemoteConfiguration(remoteConfigurationId: string) => Promise<void>
```

This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
Use this function to attach the user to the remote configuration.

| Param                       | Type                | Description                            |
| --------------------------- | ------------------- | -------------------------------------- |
| **`remoteConfigurationId`** | <code>string</code> | identifier of the remote configuration |

--------------------


### detachUserFromRemoteConfiguration(...)

```typescript
detachUserFromRemoteConfiguration(remoteConfigurationId: string) => Promise<void>
```

This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
Use this function to detach the user from the remote configuration.

| Param                       | Type                | Description                            |
| --------------------------- | ------------------- | -------------------------------------- |
| **`remoteConfigurationId`** | <code>string</code> | identifier of the remote configuration |

--------------------


### isFallbackFileAccessible()

```typescript
isFallbackFileAccessible() => Promise<Boolean>
```

Call this function to check if the fallback file is accessible.

**Returns:** <code>Promise&lt;<a href="#boolean">Boolean</a>&gt;</code>

--------------------


### attribution(...)

```typescript
attribution(data: Object, provider: AttributionProvider) => void
```

Sends your attribution {@link data} to the {@link provider}.

| Param          | Type                                                                | Description                                 |
| -------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| **`data`**     | <code><a href="#object">Object</a></code>                           | an object containing your attribution data  |
| **`provider`** | <code><a href="#attributionprovider">AttributionProvider</a></code> | the provider to which the data will be sent |

--------------------


### setUserProperty(...)

```typescript
setUserProperty(key: UserPropertyKey, value: string) => void
```

Sets Qonversion reserved user properties, like email or user id

User properties are attributes you can set on a user level.
You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
and analytics.

Note that using {@link <a href="#userpropertykey">UserPropertyKey.CUSTOM</a>} here will do nothing.
To set custom user property, use {@link setCustomUserProperty} method instead.

| Param       | Type                                                        | Description                                          |
| ----------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **`key`**   | <code><a href="#userpropertykey">UserPropertyKey</a></code> | defined enum key that will be transformed to string. |
| **`value`** | <code>string</code>                                         | property value.                                      |

--------------------


### setCustomUserProperty(...)

```typescript
setCustomUserProperty(key: string, value: string) => void
```

Adds custom user property.

User properties are attributes you can set on a user level.
You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
and analytics.

| Param       | Type                | Description               |
| ----------- | ------------------- | ------------------------- |
| **`key`**   | <code>string</code> | custom user property key. |
| **`value`** | <code>string</code> | property value.           |

--------------------


### userProperties()

```typescript
userProperties() => Promise<UserProperties>
```

This method returns all the properties, set for the current Qonversion user.
All set properties are sent to the server with delay, so if you call
this function right after setting some property, it may not be included
in the result.

**Returns:** <code>Promise&lt;UserProperties&gt;</code>

--------------------


### setEntitlementsUpdateListener(...)

```typescript
setEntitlementsUpdateListener(listener: EntitlementsUpdateListener) => void
```

Provide a listener to be notified about asynchronous user entitlements updates.

Make sure you provide this listener for being up-to-date with the user entitlements.
Else you can lose some important updates. Also, please, consider that this listener
should live for the whole lifetime of the application.

You may set entitlements listener both *after* Qonversion SDK initializing
with {@link QonversionApi.setEntitlementsUpdateListener} and *while* Qonversion initializing
with {@link Qonversion.initialize}.

| Param          | Type                                                                              | Description                                    |
| -------------- | --------------------------------------------------------------------------------- | ---------------------------------------------- |
| **`listener`** | <code><a href="#entitlementsupdatelistener">EntitlementsUpdateListener</a></code> | listener to be called when entitlements update |

--------------------


### collectAdvertisingId()

```typescript
collectAdvertisingId() => void
```

iOS only. Does nothing if called on Android.

On iOS 14.5+, after requesting the app tracking permission using ATT, you need to notify Qonversion if tracking
is allowed and IDFA is available.

--------------------


### collectAppleSearchAdsAttribution()

```typescript
collectAppleSearchAdsAttribution() => void
```

iOS only. Does nothing if called on Android.

Enable attribution collection from Apple Search Ads.

--------------------


### setPromoPurchasesDelegate(...)

```typescript
setPromoPurchasesDelegate(delegate: PromoPurchasesListener) => void
```

iOS only. Does nothing if called on Android.

Set the delegate to handle promo purchases.
The delegate is called when a promo purchase from the App Store happens.

| Param          | Type                                                                      | Description                               |
| -------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| **`delegate`** | <code><a href="#promopurchaseslistener">PromoPurchasesListener</a></code> | delegate to be called when event happens. |

--------------------


### presentCodeRedemptionSheet()

```typescript
presentCodeRedemptionSheet() => void
```

iOS only. Does nothing if called on Android.

On iOS 14.0+ shows up a sheet for users to redeem App Store offer codes.

--------------------


### Interfaces


#### Map

| Prop       | Type                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |

| Method      | Signature                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| **clear**   | () =&gt; void                                                                                                  |
| **delete**  | (key: K) =&gt; boolean                                                                                         |
| **forEach** | (callbackfn: (value: V, key: K, map: <a href="#map">Map</a>&lt;K, V&gt;) =&gt; void, thisArg?: any) =&gt; void |
| **get**     | (key: K) =&gt; V \| undefined                                                                                  |
| **has**     | (key: K) =&gt; boolean                                                                                         |
| **set**     | (key: K, value: V) =&gt; this                                                                                  |


#### Array

| Prop         | Type                | Description                                                                                            |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| **`length`** | <code>number</code> | Gets or sets the length of the array. This is a number one higher than the highest index in the array. |

| Method             | Signature                                                                                                                     | Description                                                                                                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**       | () =&gt; string                                                                                                               | Returns a string representation of an array.                                                                                                                                                                                                |
| **toLocaleString** | () =&gt; string                                                                                                               | Returns a string representation of an array. The elements are converted to string using their toLocalString methods.                                                                                                                        |
| **pop**            | () =&gt; T \| undefined                                                                                                       | Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                          |
| **push**           | (...items: T[]) =&gt; number                                                                                                  | Appends new elements to the end of an array, and returns the new length of the array.                                                                                                                                                       |
| **concat**         | (...items: <a href="#concatarray">ConcatArray</a>&lt;T&gt;[]) =&gt; T[]                                                       | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **concat**         | (...items: (T \| <a href="#concatarray">ConcatArray</a>&lt;T&gt;)[]) =&gt; T[]                                                | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **join**           | (separator?: string \| undefined) =&gt; string                                                                                | Adds all the elements of an array into a string, separated by the specified separator string.                                                                                                                                               |
| **reverse**        | () =&gt; T[]                                                                                                                  | Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                        |
| **shift**          | () =&gt; T \| undefined                                                                                                       | Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                         |
| **slice**          | (start?: number \| undefined, end?: number \| undefined) =&gt; T[]                                                            | Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.                           |
| **sort**           | (compareFn?: ((a: T, b: T) =&gt; number) \| undefined) =&gt; this                                                             | Sorts an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                                           |
| **splice**         | (start: number, deleteCount?: number \| undefined) =&gt; T[]                                                                  | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **splice**         | (start: number, deleteCount: number, ...items: T[]) =&gt; T[]                                                                 | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **unshift**        | (...items: T[]) =&gt; number                                                                                                  | Inserts new elements at the start of an array, and returns the new length of the array.                                                                                                                                                     |
| **indexOf**        | (searchElement: T, fromIndex?: number \| undefined) =&gt; number                                                              | Returns the index of the first occurrence of a value in an array, or -1 if it is not present.                                                                                                                                               |
| **lastIndexOf**    | (searchElement: T, fromIndex?: number \| undefined) =&gt; number                                                              | Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.                                                                                                                                      |
| **every**          | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; this is S[]       | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **every**          | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **some**           | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| **forEach**        | (callbackfn: (value: T, index: number, array: T[]) =&gt; void, thisArg?: any) =&gt; void                                      | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| **map**            | &lt;U&gt;(callbackfn: (value: T, index: number, array: T[]) =&gt; U, thisArg?: any) =&gt; U[]                                 | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| **filter**         | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; S[]               | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **filter**         | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; T[]                                     | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |


#### ConcatArray

| Prop         | Type                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |

| Method    | Signature                                                          |
| --------- | ------------------------------------------------------------------ |
| **join**  | (separator?: string \| undefined) =&gt; string                     |
| **slice** | (start?: number \| undefined, end?: number \| undefined) =&gt; T[] |


#### Boolean

| Method      | Signature        | Description                                          |
| ----------- | ---------------- | ---------------------------------------------------- |
| **valueOf** | () =&gt; boolean | Returns the primitive value of the specified object. |


#### Object

Provides functionality common to all JavaScript objects.

| Prop              | Type                                          | Description                                                                                                                                |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`constructor`** | <code><a href="#function">Function</a></code> | The initial value of <a href="#object">Object</a>.prototype.constructor is the standard built-in <a href="#object">Object</a> constructor. |

| Method                   | Signature                                                 | Description                                                              |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| **toString**             | () =&gt; string                                           | Returns a string representation of an object.                            |
| **toLocaleString**       | () =&gt; string                                           | Returns a date converted to a string using the current locale.           |
| **valueOf**              | () =&gt; <a href="#object">Object</a>                     | Returns the primitive value of the specified object.                     |
| **hasOwnProperty**       | (v: <a href="#propertykey">PropertyKey</a>) =&gt; boolean | Determines whether an object has a property with the specified name.     |
| **isPrototypeOf**        | (v: <a href="#object">Object</a>) =&gt; boolean           | Determines whether an object exists in another object's prototype chain. |
| **propertyIsEnumerable** | (v: <a href="#propertykey">PropertyKey</a>) =&gt; boolean | Determines whether a specified property is enumerable.                   |


#### Function

Creates a new function.

| Prop            | Type                                          |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| Method       | Signature                                                                            | Description                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.                                                                     |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | Calls a method of an object, substituting another object for the current object.                                                                                                                                         |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters. |
| **toString** | () =&gt; string                                                                      | Returns a string representation of a function.                                                                                                                                                                           |


#### EntitlementsUpdateListener

| Method                    | Signature                                                                    | Description                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **onEntitlementsUpdated** | (entitlements: <a href="#map">Map</a>&lt;string, Entitlement&gt;) =&gt; void | Called when entitlements update. For example, when pending purchases like SCA, Ask to buy, etc., happen. |


#### PromoPurchasesListener

| Method                      | Signature                                                                                                                        | Description                                                                                                                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **onPromoPurchaseReceived** | (productId: string, promoPurchaseExecutor: () =&gt; Promise&lt;<a href="#map">Map</a>&lt;string, Entitlement&gt;&gt;) =&gt; void | Fired each time a promo purchase from the App Store happens. Call {@param promoPurchaseExecutor} in case of your app is ready to start promo purchase. Or cache that executor and call later when you need. |


### Type Aliases


#### PropertyKey

<code>string | number | symbol</code>


### Enums


#### AttributionProvider

| Members                 | Value                          |
| ----------------------- | ------------------------------ |
| **`APPSFLYER`**         | <code>"AppsFlyer"</code>       |
| **`BRANCH`**            | <code>"Branch"</code>          |
| **`ADJUST`**            | <code>"Adjust"</code>          |
| **`APPLE_SEARCH_ADS`**  | <code>"AppleSearchAds"</code>  |
| **`APPLE_AD_SERVICES`** | <code>"AppleAdServices"</code> |


#### UserPropertyKey

| Members                           | Value                                  |
| --------------------------------- | -------------------------------------- |
| **`EMAIL`**                       | <code>"Email"</code>                   |
| **`NAME`**                        | <code>"Name"</code>                    |
| **`KOCHAVA_DEVICE_ID`**           | <code>"KochavaDeviceId"</code>         |
| **`APPS_FLYER_USER_ID`**          | <code>"AppsFlyerUserId"</code>         |
| **`ADJUST_AD_ID`**                | <code>"AdjustAdId"</code>              |
| **`CUSTOM_USER_ID`**              | <code>"CustomUserId"</code>            |
| **`FACEBOOK_ATTRIBUTION`**        | <code>"FacebookAttribution"</code>     |
| **`FIREBASE_APP_INSTANCE_ID`**    | <code>"FirebaseAppInstanceId"</code>   |
| **`APP_SET_ID`**                  | <code>"AppSetId"</code>                |
| **`ADVERTISING_ID`**              | <code>"AdvertisingId"</code>           |
| **`APP_METRICA_DEVICE_ID`**       | <code>"AppMetricaDeviceId"</code>      |
| **`APP_METRICA_USER_PROFILE_ID`** | <code>"AppMetricaUserProfileId"</code> |
| **`PUSH_WOOSH_HW_ID`**            | <code>"PushWooshHwId"</code>           |
| **`PUSH_WOOSH_USER_ID`**          | <code>"PushWooshUserId"</code>         |
| **`CUSTOM`**                      | <code>"Custom"</code>                  |

</docgen-api>
