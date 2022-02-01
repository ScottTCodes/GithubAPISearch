import numberTruncate from './numberTruncate';

describe("Number Truncate", () => {
  test("should truncate a thousands number with a k", async () => {
    expect(numberTruncate(10000)).toBe('10.0k');
  });

  test("should truncate a millions number with a m", async () => {
    expect(numberTruncate(1000000)).toBe('1.0m');
  });
})
