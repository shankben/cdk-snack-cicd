import fs from "fs";
import path from "path";
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import PipelineStack from "../lib/stacks/pipeline";
import { ensureSecrets } from "../lib/utils";

const pjp = path.join(__dirname, "..", "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(pjp).toString());
const {
  gitHubBranch,
  gitHubOwner,
  gitHubRepository,
  gitHubTokenSecretId
} = packageJson.config;

async function main() {
  await ensureSecrets();
  const app = new App();
  new PipelineStack(app, `CDKSnackCICD-${gitHubBranch}`, {
    gitHubBranch,
    gitHubOwner,
    gitHubRepository,
    gitHubTokenSecretId
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
