import { MinusOutlined } from "@ant-design/icons";
import { Form } from "@remix-run/react";
import { Button, Input, Select } from "antd";
import type { Control, FormState, UseFormSetValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import ErrorLabel from "~/common/components/ErrorLabel";
import Label from "~/common/components/Label";
import type { QuestionFormValues } from "../question-form-resolver";
import Tags from "./Tags";

const questionTypeOptions = [
  // {
  //   label: "단답형",
  //   value: "short",
  // },
  // {
  //   label: "단답형 (답 여러 개)",
  //   value: "short_multi",
  // },
  {
    label: "단답형 (답 여러 개 + 순서)",
    value: "short_order",
  },
  // {
  //   label: "다른 것 하나 고르기",
  //   value: "pick_different",
  // },
  // {
  //   label: "객관식",
  //   value: "pick",
  // },
  // {
  //   label: "객관식 (답 여러 개)",
  //   value: "pick_multi",
  // },
  // {
  //   label: "객관식 (답 여러 개 + 순서)",
  //   value: "pick_order",
  // },
];

const QuestionForm: React.FC<{
  control: Control<QuestionFormValues>;
  setValue: UseFormSetValue<QuestionFormValues>;
  formState: FormState<QuestionFormValues>;
  values: QuestionFormValues;
}> = ({ control, formState: { errors }, setValue, values }) => {
  return (
    <Form>
      <div className="flex flex-col mb-4">
        <Label htmlFor="question_type">타입</Label>
        <Controller
          control={control}
          name="question.type"
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={questionTypeOptions}
                id="question_type"
              />
            );
          }}
        />
      </div>
      <div className="flex flex-col mb-4">
        <Label htmlFor="question_message">내용</Label>
        <Controller
          control={control}
          name="question.message"
          render={({ field }) => {
            return (
              <Input.TextArea
                {...field}
                required
                id="question_message"
                placeholder="내용을 작성하세요"
              />
            );
          }}
        />
        {errors?.question?.message &&
          typeof errors.question.message !== "string" && (
            <ErrorLabel htmlFor="question_message">
              {errors.question.message.message}
            </ErrorLabel>
          )}
      </div>

      {/* ShortOrder corrects */}
      {values.question?.type === "short_order" && (
        <div className="flex flex-col mb-4">
          <Label htmlFor="correct">정답</Label>
          <div className="flex flex-col gap-2 mb-2">
            {values.question.corrects?.map((q, index) => (
              <div key={index} className="flex gap-2">
                <Controller
                  control={control}
                  name={`question.corrects.${index}`}
                  render={({ field }) => {
                    return <Input {...field} />;
                  }}
                />

                <Button
                  className="inline-flex items-center justify-center p-2 bg-transparent "
                  type="text"
                  onClick={() => {
                    if (
                      values.question.type === "short_order" &&
                      values.question.corrects
                    ) {
                      setValue(`question.corrects`, [
                        ...values.question.corrects.slice(0, index),
                        ...values.question.corrects.slice(index + 1),
                      ]);
                    }
                  }}
                  icon={<MinusOutlined />}
                ></Button>
              </div>
            ))}
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                if (values.question.type === "short_order") {
                  setValue(`question.corrects`, [
                    ...(values.question.corrects ?? []),
                    "",
                  ]);
                }
              }}
            >
              추가
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col mb-4">
        <Label htmlFor="tags">태그</Label>
        <Controller
          control={control}
          name="question.tags"
          render={({ field }) => {
            const { onChange, value } = field;
            return <Tags onChange={onChange} value={value} />;
          }}
        />
      </div>
    </Form>
  );
};

export default QuestionForm;