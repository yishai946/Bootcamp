const formatDate = (dateString: string, withTime: boolean = false) => {
  const dateParts = dateString.split('T')[0].split('-').reverse().join('/');
  if (withTime) {
    const timeParts = dateString.split('T')[1].split(':');
    return `${dateParts} ${timeParts[0]}:${timeParts[1]}`;
  }
  return dateParts;
};

const toDatetimeLocalString = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

export { formatDate, toDatetimeLocalString };
