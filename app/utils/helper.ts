export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "NA";
  const [year, month, day] = dateString.split("-");
  const monthNames = new Map<number, string>([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
  ]);

  return `${+day} ${monthNames.get(+month)} ${year}`;
};

export const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, "");
};
