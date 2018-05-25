# milis
Node.js library to simplify the process of mailing list integration and management (etc Mailchimp).

## Installation
```bash
$ npm install --save milis
```

## Usage
```js
const milis = require('milis');
```

### Mailchimp Provider
Synchronize users to list
```js
const Mailchimp = milis('mailchimp', {
    API_KEY: 'YOUR_MAILCHIMP_API_KEY',
});

const getUsers = new Promise((resolve, reject) => {
    const users = [
        {
            email_address: 'your_user@email_address.com',
            email_type: 'html',
            status: 'subscribed',
            merge_fields: {
                "FNAME": "USER_FIRST_NAME",
                "LNAME": "USER_LAST_NAME"
            }
        }
    ];
    
    resolve(users);
});

Mailchimp.syncUserToList(getUsers, {
    listId: 'MAILCHIMP_LIST_ID'
}).then(console.log).catch(console.error);
```