// adsp
import { createProblemGenerator } from "./problem-generator";
import { problems } from "./problems/adsp";
import prompts from "prompts";
import { isArrayEqual, isBagEqual } from "./util";

function isAbort(response: prompts.Answers<"answer">) {
  return typeof response.answer === "undefined";
}

while (true) {
  const generator = createProblemGenerator(problems);
  const problem = generator.gen();

  switch (problem.type) {
    case "SHORT": {
      const response = await prompts({
        type: "text",
        name: "answer",
        message: `${problem.q}\n`,
      });

      if (isAbort(response)) {
        process.exit();
      }

      if (response.answer === problem.correctA) {
        console.log("정답!");
      } else {
        console.log(`오답! (정답: ${problem.correctA})`);
      }
      break;
    }

    case "SHORT_MULTI": {
      const response = await prompts({
        type: "list",
        name: "answer",
        message: `${problem.q}\n`,
      });

      if (isAbort(response)) {
        process.exit();
      }

      if (isBagEqual(response.answer, problem.correctA)) {
        console.log("정답!");
      } else {
        console.log(`오답! (정답: ${problem.correctA.join(", ")})`);
      }
    }

    case "SHORT_ORDER": {
      const response = await prompts({
        type: "list",
        name: "answer",
        message: `${problem.q}\n`,
      });

      if (isAbort(response)) {
        process.exit();
      }

      if (isArrayEqual(response.answer, problem.correctA)) {
        console.log("정답!");
      } else {
        console.log(`오답! (정답: ${problem.correctA.join(", ")})`);
      }
    }
  }

  console.log("");
}
