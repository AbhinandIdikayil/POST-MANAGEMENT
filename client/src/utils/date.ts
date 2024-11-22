import { format } from 'date-fns'
export const dateToMmmmDdYy = (isoDate: string) => {
    const formattedDate = format(new Date(isoDate), "MMMM dd, yyyy");
    return formattedDate
}