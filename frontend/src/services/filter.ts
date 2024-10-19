export const filterIt = (arr: any, searchKey: string) => {
  return arr.filter((obj: { [x: string]: string | string[] }) =>
    Object.keys(obj).some((key) =>
      JSON.stringify(obj[key]).toLowerCase().includes(searchKey.toLowerCase()),
    ),
  );
};
