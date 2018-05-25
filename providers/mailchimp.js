
module.exports = configs => {
    const { API_KEY } = configs;
    const mailchimpClass = require('mailchimp-api-v3');
    const mailChimp = new mailchimpClass(API_KEY);
    const _this = {};

    _this.syncUserToList = (pGetUsers, options = {}) => new Promise((resolve, reject) => {
        let listId = '';

        if (typeof options === 'string') {
            listId = options.trim();

            options = {};
        } else {
            if (options && options.listId) {
                listId = options.listId.trim();

                delete options.listId;
            }
        }

        if (listId.length <= 0) {
            return reject(new Error('ERROR_LIST_ID_NOT_SET'));
        }

        const data = Object.assign({}, {
            update_existing: true
        }, options);

        pGetUsers.then(users => {
            data.members = users;

            mailChimp.post(`/lists/${listId}`, data, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            })
        }).catch(reject);
    });

    return _this;
}
