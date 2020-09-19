class ArrayUtil{

    public static isNullOrEmpty(list: Array<any>): boolean{
        return list == null || list == undefined || list.length == 0;
    }
}

export default ArrayUtil;