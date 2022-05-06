const crypto = require('crypto');

function genKey() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    }); 
    const privateKeyResult = privateKey.replace('-----BEGIN PRIVATE KEY-----\n', '').replace('-----END PRIVATE KEY-----\n', '')
    const publicKeyResult = publicKey.replace('-----BEGIN PUBLIC KEY-----\n', '').replace('-----END PUBLIC KEY-----\n', '')
    return  { privateKeyResult, publicKeyResult }
}

module.exports = genKey;
