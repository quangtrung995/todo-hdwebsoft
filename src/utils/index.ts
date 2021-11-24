/**
 * makeID: create random string
 * @param length Tạo 1 chuỗi string bao gồm các ký tự ngẫu nhiên và số ngẫu nhiên dựa trên length mong muốn
 * @returns 1 chuỗi string các ký tự ngẫu nhiên
 * @author @quangtrung995
 */
 export const makeID = (length: number) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };