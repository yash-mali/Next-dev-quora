import dayjs from "dayjs";

export const dateTimeFormat = (value: string) => {
  return dayjs(value).format("DD/MM/YYYY HH:mm A");
};
