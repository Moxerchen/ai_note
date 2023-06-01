interface Note {
    note_id: number;
    title: string;
    content: string;
}

export interface UserInfo extends Note{
    email: string;
    password: string;
    notes?: Note[] | null;
    username: string;
    signature: string;
    isFirstLogin: boolean;
}

export type UserInfoArray = Array<UserInfo>