const formatDate = (dateString: string, withTime: boolean = false) => {
  if (!dateString) return '';

  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-');
  const formattedDate = [day, month, year].filter(Boolean).join('/');

  if (!withTime) {
    return formattedDate;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return formattedDate;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${formattedDate} ${hours}:${minutes}`;
};

const toDatetimeLocalString = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

export { formatDate, toDatetimeLocalString };
