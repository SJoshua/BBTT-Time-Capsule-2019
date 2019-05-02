# Time Capsule 2019
## API Document
### Making Requests
All queries to the API need to be presented in this form: `/api/METHOD_NAME`. Like this for example:

```
http://server.sforest.in/api/sendCapsule
```

It supports **POST** HTTP method only. Please pass parameters by `application/json` only.

The response contains a JSON object. The Boolean field `ok` will be `true` if **the API call successed**, otherwise `false`. In the case of API call failed, a String field `description` and a Integer field `error_code` will be returned to explain the error.

### sendTimeCapsule
Use this method to send time capsule.

| Field         | Type   | Required | Description                                                    |
|---------------|--------|----------|----------------------------------------------------------------|
| sender_name   | String | Yes      | Sender's name.                                                 |
| sender_tel    | String | Yes      | Sender's telephone number.                                     |
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

| Field       | Type    | Required | Description                                                    |
|-------------|---------|----------|----------------------------------------------------------------|
| sender_name | String  | Yes      | Sender's name.                                                 |
| sender_tel  | String  | Yes      | Sender's telephone number.                                     |
| period      | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| question    | Integer | Yes      | The id of selected question.                                   |
| message     | String  | Yes      | The answer to selected question.                               |

### sendOfflineCapsule
Use this method to send offline capsule.

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| sender_name   | String  | Yes      | Sender's name.                                                 |
| sender_tel    | String  | Yes      | Sender's telephone number.                                     |
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_id    | Integer | Yes      | The number attached on the envelope.                           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |

### getQuestions
Use this method to get questions.

Requires no parameters.

#### Response
| Field         | Type            | Description                                             |
|---------------|-----------------|---------------------------------------------------------|
| question_list | Array of String | A list of questions. The index of a question is its id. |

### getQRCode
Use this method to get QR Code for specified user.

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

| Field              | Type    | Description                                           |
|--------------------|---------|-------------------------------------------------------|
| sent               | Integer | The number of sent capsules.                          |
| received_by_qrcode | Integer | The number of received capsules via QR Code.          |
| received_by_tel    | Integer | The number of received capsules via telephone number. |
| answered           | Integer | The number of answers in Question Capsule.            |
