const request = require("supertest");
const buildApp = require("../../app");
const userRepo = require("../../repos/user-repo");
const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it("create a user", async () => {
  const startingCount = await userRepo.count();
  expect(startingCount).toEqual(0);

  await request(buildApp())
    .post("/users")
    .send({ username: "testuser", bio: "test bio" })
    .expect(200);

  const endingCount = await userRepo.count();
  expect(endingCount).toEqual(1);
});
