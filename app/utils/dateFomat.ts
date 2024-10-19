import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

/* 07 กุมภาพันธ์ 2566 */
export const DateLongTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMMM BBBB");
};

/* 07 ก.พ. 2566 */
export const DateShortTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BB");
};

export const DateShortTHAndTime = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BB HH:mm");
}

/* 07 February 2023 */
export const DateLongEN = (date: Date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMMM YYYY");
};

/* 07 Feb 23 */
export const DateShortEN = (date: Date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMM YY");
};

export const DiffBetweenDateInMinutes = (date1: Date, date2: Date) => {
  const diffDateInSecond = dayjs(date1).diff(dayjs(date2), "second");
  if (diffDateInSecond < 60) {
    return diffDateInSecond;
  }
  return Math.floor(diffDateInSecond / 60);
}

export const DiffBetweenDateInSecond = (date1: Date, date2: Date) => {
  return dayjs(date1).diff(dayjs(date2), "second");
}

export const DiffBetweenDateWithLabel = (date1: Date, date2: Date) => {
  const diffDateInSecond = dayjs(date1).diff(dayjs(date2), "second");
  if (diffDateInSecond < 60) {
    return `${diffDateInSecond} วินาที`;
  }
  const diffDateInMinute = Math.floor(diffDateInSecond / 60);
  if (diffDateInMinute < 60) {
    return `${diffDateInMinute} นาที`;
  }
  const diffDateInHour = Math.floor(diffDateInMinute / 60);
  if (diffDateInHour < 24) {
    return `${diffDateInHour} ชั่วโมง`;
  }
  const diffDateInDay = Math.floor(diffDateInHour / 24);
  return `${diffDateInDay} วัน`;
}

export const ConvertSecondToLabel = (second: number) => {
  // if (second < 60) {
  //   return `${second} วินาที`;
  // }
  const minute = Math.floor(second / 60);
  if (minute < 60) {
    return `${minute} นาที`;
  }
  const hour = Math.floor(minute / 60);
  if (hour < 24) {
    return `${hour} ชั่วโมง`;
  }
  const day = Math.floor(hour / 24);
  return `${day} วัน`;
}

export const converTimeHrToSec = (time: number) => {
  return time * 60 * 60;
}