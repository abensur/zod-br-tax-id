import { z } from "zod";
import { ZodCNPJ } from "../types";

/*
    CNPJ (Cadastro Nacional da Pessoa Jurídica) is the Brazilian company taxpayer registry identification.

    Formats:
    [Instrução Normativa RFB nº 2119, de 06 de dezembro de 2022](http://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=127567#2392764)

    Official format
    xx.xxx.xxx/xxxx-xx
*/

const defaultOptions: ZodCNPJ = {
  message: "CNPJ inválido",
  strict: false,
};

const cnpj = (options?: ZodCNPJ) =>
  z.custom<string>(
    (val) => {
      const { strict } = { ...defaultOptions, ...options };

      const cnpjString = String(val);

      if (strict) return strictValidations(cnpjString);

      // biggest non strict length is 18 "xx.xxx.xxx/xxxx-xx"
      if (cnpjString.length > 18) return false;

      const cnpjPattern = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}|\d{14})$/;

      if (!cnpjPattern.test(cnpjString)) return false;

      const sanitizedCnpj = cnpjString.replace(/\D/g, "");

      return strictValidations(sanitizedCnpj);
    },
    {
      message: options?.message || defaultOptions.message,
    }
  );

const strictValidations = (digits: string) => {
  // check if it is not a sequence of the same numbers
  if (/^(\d)\1+$/.test(digits)) return false;

  // check if length is 14
  if (digits.length !== 14) return false;

  return calculateCheckDigit(digits);
};

const calculateCheckDigit = (digits: string) => {
  let dig1 = 0;
  let dig2 = 0;

  const validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit = parseInt(digits.charAt(12) + digits.charAt(13));

  const getRest = (dig: number) => (dig % 11 < 2 ? 0 : 11 - (dig % 11));

  validation.map((v, i) => {
    dig1 += i > 0 ? parseInt(digits.charAt(i - 1)) * v : 0;
    dig2 += parseInt(digits.charAt(i)) * v;
  });

  dig1 = getRest(dig1);
  dig2 = getRest(dig2);

  return dig1 * 10 + dig2 === digit;
};

export default cnpj;
