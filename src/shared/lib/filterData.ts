export const searchFilter = <T>(
  array: T[],
  text: string,
  arrayKeys: Extract<keyof T, string>[],
) => {
  if (!text) return array;
  return array?.filter((prop) =>
    arrayKeys.some(
      (key) =>
        JSON.stringify(prop[key])
          ?.toLowerCase()
          ?.indexOf(text?.toLowerCase()) !== -1,
    ),
  );
};
