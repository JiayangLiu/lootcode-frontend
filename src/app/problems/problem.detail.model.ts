export class ProblemDetail {
    problemId : number;
    title: string;
    description: string;
    difficulty: string;
    Company: string[];
    tag: string;
    code: Code[];
}

export class Code{
    isAccepted: boolean;
    performance: number;
    code_language: string;
    time_created: string;
    time_modified: string;
    content: string;
    note: Note;
}

export class Note{
    time_created: string;
    time_modified: string;
    content: string;
}

export class UserProblem{
    user_id: string;
    problem_id: number;
}