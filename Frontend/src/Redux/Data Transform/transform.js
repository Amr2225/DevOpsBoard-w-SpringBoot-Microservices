import { createTransform } from "redux-persist";
import { encryptData, decryptData } from "../Encrypt/encryption";

const encryptionTransform = createTransform(
  (inboundState) => {
    return encryptData(inboundState);
  },
  (outboutState) => {
    return decryptData(outboutState);
  },
  { whitelist: ["user"] }
);

export default encryptionTransform;
