import forge from 'node-forge';

const getOaepOptions = () => ({
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha256.create()
  }
});

export const encryptMessage = (publicKeyPem, text) => {
  try {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const bytes = forge.util.encodeUtf8(text);
    const encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', getOaepOptions());
    return forge.util.encode64(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const generateKeyPairAsync = () => {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 }, (err, keys) => {
      if (err) return reject(err);
      
      const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
      
      resolve({
        publicKey: publicKeyPem,
        privateKey: privateKeyPem
      });
    });
  });
};

export const decryptMessage = (privateKeyPem, encryptedBase64) => {
  try {
    if (!privateKeyPem || !encryptedBase64) return "";
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBytes = forge.util.decode64(encryptedBase64);
    const decrypted = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', getOaepOptions());
    return forge.util.decodeUtf8(decrypted);
  } catch (error) {
    return "[Decryption error: Old message or incompatible key]";
  }
};