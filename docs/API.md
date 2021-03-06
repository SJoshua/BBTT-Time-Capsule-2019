# Time Capsule 2019
## API Document
### Making Requests
All queries to the API need to be presented in this form: `/api/METHOD_NAME`. Like this for example:

```
http://server.sforest.in/api/sendTimeCapsule
```

Please pass parameters by `application/json` for those API using **POST** HTTP Request Method.

The response contains a JSON object. The HTTP status code indicates the status of API call. In case of a failed API call, there will be a `message` field to descript the error.

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

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| type          | String  | Yes      | The type of time capsule. Must be `text` or `voice`.           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| from_qrcode   | Boolean | Yes      | If the sender scanned a QR Code.                               |
| message       | String  | Optional | The message of time capsule.                                   |
| file_id       | String  | Optional | The file id of recorded voice.                                 |

#### Response
| Field | Type    | Description                                 |
|-------|---------|---------------------------------------------|
| count | Integer | The number of sent time-capsules by sender. |

### sendQuestionCapsule
Use this method to send question capsule.

HTTP Request Method: **POST**

| Field       | Type   | Required | Description                                                    |
|-------------|--------|----------|----------------------------------------------------------------|
| period      | String | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| question    | String | Yes      | The id of selected question. Such as `101`.                    |
| message     | String | Yes      | The answer to selected question.                               |

### sendOfflineCapsule
Use this method to send offline capsule.

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| sender_name   | String  | Yes      | Sender's name.                                                 |
| sender_tel    | String  | Yes      | Sender's telephone number.                                     |
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_tag   | String  | Yes      | The tag ID attached on the envelope.                           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |

### getQuestions
Use this method to get questions.

HTTP Request Method: **GET**

Requires no parameters.

#### Response
| Field         | Type            | Description                                                                                                            |
|---------------|-----------------|------------------------------------------------------------------------------------------------------------------------|
| question_list | Array of String | A array of three questions. The id of a question is `[CATEGORY_INDEX] * 100 + [QUESTION_INDEX]`, such as `100`, `203`. |

### getQRCode
Use this method to get QR Code for specified user.

HTTP Request Method: **GET**

Requires no parameters.

#### Response
| Field | Type   | Description                                |
|-------|--------|--------------------------------------------|
| image | String | An inline image (png), encoded in base64. |

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

### getName
Use this method to get user's name of specified UID, which is used in QR Code generation.

HTTP Request Method: **POST**

| Field | Type    | Required | Description     |
|-------|---------|----------|-----------------|
| uid   | String  | Yes      | UID in QR Code. |

#### Response
| Field  | Type    | Description                                      |
|--------|---------|--------------------------------------------------|
| record | Boolean | If user's info have been recorded.               |
| name   | String  | User's name if `record` is **true**.             |
| tel    | String  | User's telephone number if `record` is **true**. |

### isOngoing	
Use this method to know if the event is ongoing.	

HTTP Request Method: **GET**

Requires no parameters.	

#### Response	
| Field  | Type      | Description                                                                |	
|--------|-----------|----------------------------------------------------------------------------|
| status | Integer   | 0 if event is on-going, 1 if event has ended, -1 if event not started yet. |	
| begin  | Timestamp | The timestamp of the beginning of event.                                   |	
| end    | Timestamp | The timestamp of the ending of event.                                      |	

