import { Buffer } from 'buffer';

export const readFile: (
  file: File,
  outputType?: 'string' | 'base64'
) => Promise<string | ArrayBuffer | null> = (
  file: File,
  outputType?: 'string' | 'base64'
) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    if (outputType === 'string') {
      fr.readAsText(file);
    } else {
      fr.readAsDataURL(file);
    }
  });
};

// converting between base64-encoded strings and
// binary data should be performed using Buffer.from(str, 'base64')
// and buf.toString('base64').
// Use Buffer.from(data, 'base64') instead

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = Buffer.from(arr[1], 'base64');

  return new File([new Uint8Array(bstr)], filename, { type: mime });
};

export const bufferStringToURLObject = (
  bufferStr: string,
  type: string,
  name: string
) => {
  const bstr = Buffer.from(bufferStr, 'base64');
  const file = new File([new Uint8Array(bstr)], name, { type });
  return URL.createObjectURL(file);
};
