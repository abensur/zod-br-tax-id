import { z } from "zod";
import { ZodCPF } from "../types";

/*
    CPF (Cadastro de Pessoas Físicas) is the Brazilian individual taxpayer registry identification.
    
    Formats:
    [Instrução Normativa RFB nº 1548, de 13 de fevereiro de 2015](http://normas.receita.fazenda.gov.br/sijut2consulta/link.action?visao=anotado&idAto=61197)

    Official format
    xxx.xxx.xxx-xx
    
    Presented for affiliated entities. [Attachement I from RFB nº 1548](http://normas.receita.fazenda.gov.br/sijut2consulta/anexoOutros.action?idArquivoBinario=34586)
    xxx.xxx.xxx - xx

    CIC (predecessor of CPF)
    xxx xxx xxx xx
*/

const defaultOptions: ZodCPF = {
  message: "CPF inválido",
  strict: false,
  alternatives: false,
};

const cpf = (options?: ZodCPF) =>
  z.custom<string>((val) => {
    const { strict, alternatives } = { ...defaultOptions, ...options };

    const cpfString = String(val);

    if (strict) return strictValidations(cpfString);

    // biggest non strict length is 16 "xxx.xxx.xxx - xx"
    if (cpfString.length > 16) return false;

    const noPattern = /^(\d){11}$/;
    const officialPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const affiliatedEntitiesPattern = /^\d{3}\.\d{3}\.\d{3} - \d{2}$/;
    const cicPattern = /^\d{3} \d{3} \d{3} \d{2}$/;

    let cpfPattern: RegExp;

    if (alternatives) {
      cpfPattern = new RegExp(`^(${officialPattern.source}|${affiliatedEntitiesPattern.source}|${cicPattern.source})$`);
    } else {
      cpfPattern = officialPattern;
    }

    cpfPattern = new RegExp(`^(${noPattern.source}|${cpfPattern.source})$`);

    if (!cpfPattern.test(cpfString)) return false;

    const sanitizedCPF = cpfString.replace(/\D/g, "");

    return strictValidations(sanitizedCPF);
  }, options?.message || defaultOptions.message);

const strictValidations = (digits: string) => {
  // check if it is not a sequence of the same numbers
  if (/^(\d)\1+$/.test(digits)) return false;

  // check if length is 11
  if (digits.length !== 11) return false;

  return calculateCheckDigit(digits);
};

const calculateCheckDigit = (digits: string) => {
  const validation1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const validation2 = [...validation1].slice(0, 9).concat([11]);

  const getRest = (sum: number) => {
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const sumForCheckDigit = (digits: string, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(digits.charAt(i)) * weights[i];
    }
    return getRest(sum);
  };

  const checkDigit1 = sumForCheckDigit(digits, validation1);
  const checkDigit2 = sumForCheckDigit(digits, validation2);

  if (digits === "12345678909") console.log(checkDigit1, checkDigit2);

  return checkDigit1 === parseInt(digits[9]) && checkDigit2 === parseInt(digits[10]);
};

export default cpf;
