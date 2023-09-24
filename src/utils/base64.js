export const convertToBase64 = imageUri => {
  const {Buffer} = require('buffer');
  const bufferObject = Buffer.from(imageUri);
  const base64Image = bufferObject.toString('base64');
  // console.log("----------Base64 Image : ", bufferObject, "-------------", base64Image);
  // return { base64Array: bufferObject, base64String: base64Image };
  //   return bufferObject;
  return base64Image;
};
