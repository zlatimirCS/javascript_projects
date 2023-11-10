import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 3, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ max: 100 }).optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 3, max: 20 }),
    description: g.string().length({ max: 100 }),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(User),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().update().delete();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: process.env.JWT_SECRET as string,
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
