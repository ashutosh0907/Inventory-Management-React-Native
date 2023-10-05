import ImgToBase64 from 'react-native-image-base64';

// export const convertToBase64 = imageUri => {
//   const {Buffer} = require('buffer');
//   const bufferObject = Buffer.from(imageUri);
//   const base64Image = bufferObject.toString('base64');
//   console.log(
//     '----------Base64 Image : ',
//     bufferObject,
//     '-------------',
//     base64Image,
//   );
//   // return { base64Array: bufferObject, base64String: base64Image };
//   //   return bufferObject;
//   return base64Image;
// };

const doSomethingWith = base64String => {
  return base64String;
};
export const convertToBase64 = async imageUri => {
  var result = ImgToBase64.getBase64String(imageUri)
    .then(base64String => {
      doSomethingWith(base64String);
    })
    .catch(err => {
      console.log(err);
    });
  return result;
};
