export const blobToBase64 = (blob: Blob) => {
  return new Promise<string | ArrayBuffer | null>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
