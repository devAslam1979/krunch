export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

export const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, "");
};
