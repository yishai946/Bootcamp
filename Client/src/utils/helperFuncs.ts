const formatDate = (dateString: string) => dateString.split('T')[0].split('-').reverse().join('/');

export { formatDate };
