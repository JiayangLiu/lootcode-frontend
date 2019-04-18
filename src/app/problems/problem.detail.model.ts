export class ProblemDetail {
    id : number;
    name: string;
    desc: string;
    difficulty: string;
    company: string;
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