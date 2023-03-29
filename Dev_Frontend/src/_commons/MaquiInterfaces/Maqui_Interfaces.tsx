import React from "react";

interface ICampo {
    Nome_do_Campo: string; // Nome do campo
    [rest: string]: any; // Resto dos props - Para passar propriedades padrões (por exemplo: children)
}

interface ICampoTexto {
    Nome_do_Campo: string;
    Limite_Caracteres?: number;
    [rest: string]: any;
}

interface ICampoTextoCPF {
    Nome_do_Campo?: string;
    [rest: string]: any;
}

interface ICampoLiteral {
    Nome_do_Campo: string;
    Opcoes: Array<LiteralOption>;
    Com_Selecione?: Boolean;
    [rest: string]: any;
}

type LiteralOption = {
    value: string,
    label: string
}

interface IBotaoLento {
    Rotulo_Botao: string;
    Carregando: boolean;
    Acao: () => void;
    Icone: any;
    [rest: string]: any;
}

interface IBotaoVoltar {
    Acao_Voltar: () => void;
}

export type { ICampo, ICampoTexto, ICampoTextoCPF, ICampoLiteral, IBotaoLento, IBotaoVoltar, LiteralOption };