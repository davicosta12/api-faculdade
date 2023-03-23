import moment from "moment";

export const toastError = (err: any, msg?: string) => {
  console.error(err);
  let message = (typeof err === 'string' ? err : msg) || err?.data?.title || err?.data?.erroMessage || err?.data?.message || err?.message || 'Ocorreu um erro';
  if (err?.status === 401 && !err?.data?.erroMessage) message = "Acesso não permitido";
  if (err?.status === 502) message = "Serviço temporariamente indisponível";
  return message;
}

export const toastOptions = (toast: any) => {
  return Object.assign({
    position: toast.POSITION.TOP_RIGHT,
  });
}

export const formatDateTime = (date: string) => {
  const dateMoment = moment(date);
  return dateMoment.isValid() ? dateMoment.format("DD/MM/YYYY - HH:mm:ss") : "";
}

export const formatDate = (date: string) => {
  const dateMoment = moment(date);
  return dateMoment.isValid() ? dateMoment.format("DD/MM/YYYY") : "";
}

export const toUTCDateString = (date: Date): string => {
  return date.getUTCFullYear()
    + '-' + ((date.getUTCMonth() + 1) + '').padStart(2, '0')
    + '-' + (date.getUTCDate() + '').padStart(2, '0')
    + 'T' + (date.getUTCHours() + '').padStart(2, '0')
    + ':' + (date.getUTCMinutes() + '').padStart(2, '0')
    + ':' + (date.getUTCSeconds() + '').padStart(2, '0');
}

export const prepareDateToAPI = (date: Date): string => {
  return encodeURI(
    date.getUTCFullYear()
      + '-' + ((date.getUTCMonth() + 1) + '').padStart(2, '0')
      + '-' + (date.getUTCDate() + '').padStart(2, '0')
      + 'T' + (date.getUTCHours() + '').padStart(2, '0')
      + ':' + (date.getUTCMinutes() + '').padStart(2, '0')
      + ':' + (date.getUTCSeconds() + '').padStart(2, '0')
  );
}

export const requiredMessage: string = "Por favor, preencha o campo!";