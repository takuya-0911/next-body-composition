
/**
 * input要素number型の値に対して
 * 整数最大桁数に達したらピリオドを付与し、
 * 小数点第一位で返却する処理
 * @param {String} value 値
 * @param {String} max 最大桁数
 * @returns 変換後の値
 */
const NumberLimit = (value, max) => {

    // 最大桁数が設定されてない場合
    if (!max) {
        return value;
    }

    // 返却値
    let retVal = "";
    // 数値正規表現
    const regex = new RegExp(/^-?[0-9]+\.?[0-9]*$/);
    if (!regex.test(value)) {
        return retVal;
    }

    // 整数部,小数点以下
    let [intPart, decimalPoint] = value.toString().split('.');
    // 最大桁数
    const maxDigit = parseInt(max, 10);
    // 小数点以下存在チェック
    if (decimalPoint) {
        // 小数点第一位のみ切り出し
        decimalPoint = decimalPoint.slice(0,1);
        // 整数部は最大桁数、小数点第一位まで
        retVal = `${intPart.slice(0,maxDigit)}.${decimalPoint.slice(0,1)}`;
    } else {
        // 小数点無し最大桁数の場合
        if (intPart.length == maxDigit + 1) {
            decimalPoint = intPart.slice(-1);
            retVal = `${intPart.slice(0,maxDigit)}.${decimalPoint}`;
        } else {
            retVal = intPart.slice(0,maxDigit);
        }
    }
    
    return retVal;
};

export default NumberLimit;