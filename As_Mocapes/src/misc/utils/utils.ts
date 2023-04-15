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

export const isValidCPF = (cpf: string): boolean => {
  
  if (cpf.length < 11) {
    return false;
  }
  if (/[^0-9]+/.test(cpf)) {
    return false;
  }
  if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
  let rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)		
		rev = 0;	
	if (rev != parseInt(cpf.charAt(9)))		
		return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

export const requiredMessage: string = "Por favor, preencha o campo!";