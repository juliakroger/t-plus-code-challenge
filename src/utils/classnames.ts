const cn = (...styles: (string | undefined | null)[]) =>
  [...styles].filter(Boolean).join(" ");

export default cn;
