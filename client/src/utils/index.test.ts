import { createHex, generateGradient } from "."

describe("createHex", () => {
  test("should return a string", () => {
    expect(typeof createHex()).toBe("string");
  });

  test("should return a string of length 6", () => {
    expect(createHex().length).toBe(6);
  });

  test("should only contain characters from 0 to 9 and a to f", () => {
    const hexCode = createHex();
    const regex = /^[0-9a-f]+$/i;
    expect(regex.test(hexCode)).toBe(true);
  });

  test("should return a different string each time it is called", () => {
    const hexCode1 = createHex();
    const hexCode2 = createHex();
    expect(hexCode1).not.toBe(hexCode2);
  });
});

describe("generateGradient", () => {
  test("returns a string", () => {
    expect(typeof generateGradient()).toBe("string");
  });
  test("returns a string starting with 'linear-gradient'", () => {
    expect(generateGradient().startsWith("linear-gradient")).toBe(true);
  });
  // test("contains two hex codes in the string", () => {
  //   const gradient = generateGradient();
  //   const hexPattern = /#[a-f0-9]{6}/g;
  //   const matches = gradient.match(hexPattern);
  //   expect(matches.length).toBe(2);
  // });
});

export {}