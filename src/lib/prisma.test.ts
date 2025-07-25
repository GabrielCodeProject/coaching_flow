import { prisma } from "./prisma";

describe("Prisma Client", () => {
  it("should be defined", () => {
    expect(prisma).toBeDefined();
  });

  it("should have user model", () => {
    expect(prisma.user).toBeDefined();
  });
});

// Mock console.log to avoid query logging in tests
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
