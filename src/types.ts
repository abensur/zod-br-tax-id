export type ZodCNPJ = {
  strict?: boolean;
  message?: string;
};

export type ZodCPF = ZodCNPJ & {
  alternatives?: boolean;
};
