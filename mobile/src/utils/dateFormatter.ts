const dateFormatter = (date: Date | string | undefined): string => {
  let dateObj: Date;

  if (date === undefined) {
    return "Data não informada";
  }

  if (typeof date === "string") {
    dateObj = new Date(date);

    // Verifica se a data é inválida
    if (isNaN(dateObj.getTime())) {
      return `Data inválida, ${date}`;
    }
  } else {
    dateObj = date;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(dateObj);
};

const dateFullFormatter = (date: Date | string | undefined): string => {
  let dateObj: Date;

  if (date === undefined) {
    return "Data não informada";
  }

  if (typeof date === "string") {
    dateObj = new Date(date);

    // Verifica se a data é inválida
    if (isNaN(dateObj.getTime())) {
      return `Data inválida, ${date}`;
    }
  } else {
    dateObj = date;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dateObj);
};

export { dateFormatter, dateFullFormatter };
