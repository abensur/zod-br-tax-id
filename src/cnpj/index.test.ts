import cnpj from "./index";
import { describe, it, expect } from "vitest";

describe("CNPJ input", () => {
  validInputs.forEach((input) => {
    it(`should parse when '${input}'`, () => {
      expect(() => cnpj().parse(input)).not.toThrow();
    });
  });

  validStrictInputs.forEach((input) => {
    it(`should parse when '${input}' with strict mode`, () => {
      expect(() => cnpj({ strict: true }).parse(input)).not.toThrow();
    });
  });

  invalidInputs.forEach((input) => {
    it(`should throw error when '${input}'`, () => {
      expect(() => cnpj().parse(input)).toThrow();
    });

    it(`should throw error when '${input}' with strict mode`, () => {
      expect(() => cnpj({ strict: true }).parse(input)).toThrow();
    });
  });

  invalidStrictInputs.forEach((input) => {
    it(`should throw error when '${input}' with strict mode`, () => {
      expect(() => cnpj({ strict: true }).parse(input)).toThrow();
    });
  });
});

const validInputs = ["18.104.583/0001-66", "18104583000166"];

const validStrictInputs = ["18104583000166"];

const invalidStrictInputs = ["18.104.583/0001-66"];

const invalidInputs = [
  "18.104.583/0001- 66",
  "18.104.583/0001 -  66",
  "18.104.583/0001--66",
  "18104583000166s",
  "11111111111111",
  11111111111111,
  "18104583000162",
  "18..104.583/0001-66",
  "18-104-583-0001-66",
  "18,104583000166",
  "18.104.583/0001-6a",
  1810458300016,
  "18.104.583/0001-62",
  1,
  "1",
  "",
  1810458300016,
];
