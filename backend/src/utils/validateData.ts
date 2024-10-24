export function validateDateString(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);
    const isValidDate = !isNaN(date.getTime());

    return isValidDate && dateString === date.toISOString().split('T')[0];
}