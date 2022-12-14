import type { QuestionInputProps } from "../types";
import PickDifferentQuestionInput from "./PickDifferentQuestionInput";
import PickQuestionInput from "./PickQuestionInput";
import ShortMultiAnswerQuestionInput from "./ShortMultiAnswerQuestionInput";
import ShortOrderQuestionInput from "./ShortOrderQuestionInput";
import ShortQuestionInput from "./ShortQuestionInput";

const QuestionInput: React.FC<QuestionInputProps> = (args) => {
  const { question } = args;

  switch (question.type) {
    case "pick":
      return <PickQuestionInput {...{ ...args, question }} />;
    case "pick_different":
      return <PickDifferentQuestionInput {...{ ...args, question }} />;
    case "short":
      return <ShortQuestionInput {...{ ...args, question }} />;
    case "short_multi":
      return <ShortMultiAnswerQuestionInput {...{ ...args, question }} />;
    case "short_order":
      return <ShortOrderQuestionInput {...{ ...args, question }} />;
    case "pick_multi":
    case "pick_order":
      throw new Error("Not implemented yet");
  }
};

export default QuestionInput;
