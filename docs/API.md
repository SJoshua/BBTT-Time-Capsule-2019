# Time Capsule 2019
## API Document
### Making Requests
All queries to the API need to be presented in this form: `/api/METHOD_NAME`. Like this for example:

```
http://server.sforest.in/api/sendTimeCapsule
```

Please pass parameters by `application/json` for those API using **POST** HTTP Request Method.

The response contains a JSON object. The Boolean field `ok` will be `true` if **the API call successed**, otherwise `false`. In the case of API call failed, a String field `description` and a Integer field `error_code` will be returned to explain the error.

### bindWechat
Use this method to bind user's wechat account. Please redirect to this API before any action. After getting user's OpenID, the API will redirect to the url specified in `callback`.

HTTP Request Method: **GET**

| Field    | Type   | Required | Description      |
|----------|--------|----------|------------------|
| callback | String | Yes      | The current url. |

### sign
Use this method to get signature for JS-SDK.

HTTP Request Method: **GET**

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| noncestr | String | Yes      | A random string.                   |
| url      | String | Yes      | The url of the page calling JSSDK. |

#### Response
| Field     | Type    | Description                       |
|-----------|---------|-----------------------------------|
| signature | String  | Signature for Wechat API Calling. |
| timestamp | Integer | The timestamp of signing.         |

### getInfo
Use this method to check if user's info have been recorded.

HTTP Request Method: **GET**

Requires no parameters.

#### Response
| Field  | Type    | Description                          |
|--------|---------|--------------------------------------|
| record | Boolean | If user's info have been recorded.   |
| name   | String  | User's name if `record` is **true**. |

### updateInfo
Use this method to update user's info.

HTTP Request Method: **POST**

| Field | Type   | Required | Description              |
|-------|--------|----------|--------------------------|
| name  | String | Yes      | User's name.             |
| tel   | String | Yes      | User's telephone number. |

### sendTimeCapsule
Use this method to send time capsule. 

HTTP Request Method: **POST**

| Field         | Type   | Required | Description                                                    |
|---------------|--------|----------|----------------------------------------------------------------|
| receiver_name | String | Yes      | Receiver's name.                                               |
| receiver_tel  | String | Yes      | Receiver's telephone number.                                   |
| type          | String | Yes      | The type of time capsule. Must be `text` or `voice`.           |
| period        | String | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| message       | String | Optional | The message of time capsule.                                   |
| signature     | String | Optional | The signature to time capsule.                                 |
| vocative      | String | Optional | The vocative of receiver.                                      |
| file_id       | String | Optional | The file id of recorded voice.                                 |

### sendQuestionCapsule
Use this method to send question capsule.

HTTP Request Method: **POST**

| Field       | Type   | Required | Description                                                    |
|-------------|--------|----------|----------------------------------------------------------------|
| period      | String | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| question    | String | Yes      | The id of selected question. Such as `1-1`.                    |
| message     | String | Yes      | The answer to selected question.                               |

### sendOfflineCapsule
Use this method to send offline capsule.

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_id    | Integer | Yes      | The number attached on the envelope.                           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |

### getQuestions
Use this method to get questions.

HTTP Request Method: **GET**

Requires no parameters.

#### Response
| Field         | Type                     | Description                                                                                                                  |
|---------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------|
| question_list | Array of Array of String | A array of **three** arrays of questions. The id of a question is `[CATEGORY_INDEX]-[QUESTION_INDEX]`, such as `1-1`, `2-3`. |

### getQRCode
Use this method to get QR Code for specified user.

HTTP Request Method: **POST**

| Field | Type   | Required | Description              |
|-------|--------|----------|--------------------------|
| name  | String | Yes      | User's name.             |
| tel   | String | Yes      | User's telephone number. |

#### Response
| Field | Type   | Description                                |
|-------|--------|--------------------------------------------|
| image | String | An inlined image (png), encoded in base64. |

### getStatistics
Use this method to get statistics of specified user.

Requires no parameters.

#### Response

| Field              | Type    | Description                                           |
|--------------------|---------|-------------------------------------------------------|
| sent               | Integer | The number of sent capsules.                          |
| received_by_qrcode | Integer | The number of received capsules via QR Code.          |
| received_by_tel    | Integer | The number of received capsules via telephone number. |
| answered           | Integer | The number of answers in Question Capsule.            |
