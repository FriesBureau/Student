

export interface Question {
  id: number;

  title?: string;
  description?: string;
  answer?: any;
  correctAnswer?: any;
  answered?: boolean;
  wasCorrect?: boolean;

}

export default Question;
