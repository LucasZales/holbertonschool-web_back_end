const createInt8TypedArray = (length, position, value) => {
    if (position < 0 || position >= length) {
        throw new Error('Position outside range');
    }
    const buffer = new ArrayBuffer(length);
    const myArr = new DataView(buffer);
    myArr.setInt8(position, value);
    return myArr;
};

export default createInt8TypedArray;
