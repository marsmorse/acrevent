const crypto = require('crypto');

let Secret = new (function () {
    "use strict";
    const algorithm = 'aes256';
    //needs to be 32 bytes
    const ENCRYPTION_KEY = "REDACTED"
    const IV_LENGTH = 16;
    const iv = crypto.createHash("sha256").update("REDACTED").digest();

    const resized_iv = Buffer.allocUnsafe(16);

    iv.copy(resized_iv);

    this.encrypt = function(text){
        console.log("encrypting");
        const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
        let cipher = crypto.createCipheriv(algorithm, key, resized_iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    };
    this.decrypt = function(text){
        console.log(`decrypted text: ${text}`);
        const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
        let decipher = crypto.createDecipheriv(algorithm, key, resized_iv);
        let decrypted = decipher.update(text, 'hex');
        console.log(decrypted.toString());
        
        dec = decipher.final();
        console.log(dec.toString());
        //decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
});

module.exports = Secret;
