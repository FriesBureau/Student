export class Option {
    id: number;
    questionId: number;
    name: string;
    answer: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.answer = data.answer;
        this.isAnswer = data.isAnswer;
    }
}
