// const forge = require("node-forge");

// exports.generateKeys = () => {
//   const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

//   return {
//     publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
//     privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
//   };
// };

// exports.encryptMessage = (publicKey, message) => {
//   const pubKey = forge.pki.publicKeyFromPem(publicKey);

//   return forge.util.encode64(pubKey.encrypt(message, "RSA-OAEP"));
// };

// exports.decryptMessage = (privateKey, encrypted) => {
//   const privKey = forge.pki.privateKeyFromPem(privateKey);

//   return privKey.decrypt(forge.util.decode64(encrypted), "RSA-OAEP");
// };
