/*
 * O objeto Date no JS não guarda a zona temporal de forma que ela influencie no valor da data. 
 * Ao invés disso, o valor da data é UTC, que é 3 horas adiantado em relaçao ao de Brasilia.
 * As informações de zona temporal são apenas atributos que não interferem em nada.
 * Quando esse objeto é exibido nos navegadores, o Javascript captura a zona temporal do client, e exibe a Data na percepção da zona temporal daquele cliente.
 * Ao criar a data usando '2022-25-02', por exemplo, o JS entende que a data ali é na precepção do UTC, na hora 00:00.
 * Ao exibir, o JS entendia que essa hora era 21:00 do dia anterior, e exibia dia 24
 * Durante os mockups eu queria criar essa mesma data mas querendo dizer que ela é na percepção da minha zona temporal, a de Brasilia.
 * É isso que esse método faz, ele cria um objeto usando o new Date() do JS e depois acrescenta o atraso de 3h ao tempo, fazendo com que seja 03:00 na hora UTC do mesmo dia.
 * O que faz com que a gente chegue ao resultado da hora zero do dia que queremos
 */
const createDateFromLocaleFormatted = (localeDate: string): Date => {
    const localeDateValueEmMilissegundos = new Date(localeDate).getTime();
    const atrasoEmRelacaoAoUTCEmMinutos = new Date().getTimezoneOffset();
    return new Date(localeDateValueEmMilissegundos + atrasoEmRelacaoAoUTCEmMinutos * 60 * 1000);
}

export { createDateFromLocaleFormatted };
