import moment from "moment";

export const formatDate = async function (date, format) {
    return moment(date).format(format);
}