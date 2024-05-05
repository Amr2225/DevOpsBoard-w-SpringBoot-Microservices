import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const encryptData = (data) => {
  const stringData = JSON.stringify(data); // Convert to string for encryption
  return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString(); // Encrypt with AES
};

// Function to decrypt data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY); // Decrypt with AES
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert to UTF-8
  return JSON.parse(decryptedData); // Convert back to JavaScript object
};
