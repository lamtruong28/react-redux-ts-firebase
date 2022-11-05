export const convertDateToDMY = (date:string) => {
    const dateSplit = date.split("-");
    return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]; // dd/MM/yyyy
}

export const convertDateToYMD = (date:string) => {
    const dateSplit = date.split("/");
    return dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0]; // yyyy-MM-dd
}