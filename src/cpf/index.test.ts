import cpf from "./index";
import { describe, it, expect } from "vitest";

describe("CPF input", () => {
  validInputs.forEach((input) => {
    it(`should parse when ${input} is ${typeof input}`, () => {
      expect(() => cpf().parse(input)).not.toThrow();
    });
  });

  validStrictInputs.forEach((input) => {
    it(`should parse when ${input} is ${typeof input} with strict mode`, () => {
      expect(() => cpf({ strict: true }).parse(input)).not.toThrow();
    });
  });

  validAlternativeInputs.forEach((input) => {
    it(`should parse when ${input} is ${typeof input} with alternatives mode`, () => {
      expect(() => cpf({ alternatives: true }).parse(input)).not.toThrow();
    });
  });

  invalidInputs.forEach((input) => {
    it(`should throw error when ${input} is ${typeof input}`, () => {
      expect(() => cpf().parse(input)).toThrow();
    });

    it(`should throw error when ${input} is ${typeof input} with strict mode`, () => {
      expect(() => cpf({ strict: true }).parse(input)).toThrow();
    });

    it(`should throw error when ${input} is ${typeof input} with alternatives mode`, () => {
      expect(() => cpf({ alternatives: true }).parse(input)).toThrow();
    });
  });

  invalidStrictInputs.forEach((input) => {
    it(`should throw error when ${input} is ${typeof input} with strict mode`, () => {
      expect(() => cpf({ strict: true }).parse(input)).toThrow();
    });
  });
});

const validInputs = ["370.204.358-66", "37020435866", 37020435866];

const validAlternativeInputs = ["370.204.358 - 66", "370 204 358 66"];

const validStrictInputs = ["37020435866"];

const invalidStrictInputs = ["370.204.358-66", "370.204.358 - 66", "370 204 358 66"];

const invalidInputs = [
  "370.204.358 -66",
  "370.204.358 -  66",
  "370.204.358--66",
  "37020435866s",
  "11111111111",
  11111111111,
  "370..204.358-66",
  "370-204-358.66",
  "370,20435866",
  "3702043586a",
  "370.204.358-65",
  3702043586,
  37020435861,
  1,
  "1",
  "",
];
