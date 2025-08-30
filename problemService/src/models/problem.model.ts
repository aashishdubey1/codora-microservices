import { Document, model, Schema } from "mongoose";

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  testCases: ITestCase[];
  editorial?: string;
}

const testSchema = new Schema<ITestCase>({
  input: {
    type: String,
    required: [true, "Input is Required"],
    trim: true,
  },
  output: {
    type: String,
    required: [true, "Output is Required"],
    trim: true,
  },
});

const problemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title must to less than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Invalid difficulty level",
      },
      default: "easy",
      required: true,
    },
    testCases: [testSchema],
    editorial: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, record) => {
        delete (record as any).__v;
        record.id = record._id;
        delete record._id;
        return record;
      },
    },
  }
);

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficult: 1 });

export const Problem = model<IProblem>("Problem", problemSchema);
