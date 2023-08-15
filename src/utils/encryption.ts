import { AES, enc } from 'react-native-crypto-js';
import { ENCRYPTION_KEY } from '@env';

export function EncryptValue(value: string) {
  return AES.encrypt(value, ENCRYPTION_KEY).toString();
}

export function DecryptValue(encryptedValue: string): string {
  return AES.decrypt(encryptedValue, ENCRYPTION_KEY).toString(enc.Utf8);
}
