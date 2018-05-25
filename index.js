const path = require('path');

module.exports = (provider, configs) => {
    if (typeof provider !== 'string') {
        provider = '';
    }

    provider = provider.trim().toLowerCase();

    if (provider.length <= 0) {
        throw new Error('ERROR_PROVIDER_NOT_SET');
    }

    const providerPath = path.resolve(path.join(__dirname, 'providers', provider));
    const providerObj = require(providerPath)(configs);
    const _this = {};

    _this.syncUserToList = (pGetUsers, options) => new Promise((resolve, reject) => {
        if (typeof providerObj.syncUserToList !== 'function') {
            return reject(new Error('ERROR_PROVIDER_NOT_HAVE_SYNC_USER_METHOD'));
        }

        providerObj.syncUserToList(pGetUsers, options).then(resolve).catch(reject);
    });

    return _this;
}
