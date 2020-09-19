class StringUtil{

    public static isNullOrEmpty(value:string): boolean{
        return value == undefined || value == null || value.length == 0;
    }

}

export default StringUtil