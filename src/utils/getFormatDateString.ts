const getFormatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hour}:${min}:${sec}`;
};

export default getFormatDateString;
