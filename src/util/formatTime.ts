import moment from "moment-jalaali";

export function formatTime(time: string) {
    return moment(time).format("HH:mm:ss");
}

export function formatDate(date: string) {
    return moment(date).format("jYYYY/jM/jD");
}
