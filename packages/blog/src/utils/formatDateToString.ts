
export const formatDateToString = (dateObj:Date) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    return `${year}-${month}-${date}`
}