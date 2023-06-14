export interface UserInfo {
    email: string;
    password: string;
    notes: {
        title: string;
        tags: string[];
        content: string;
        isPinned: boolean;
    }[];
    name: string;
    signature: string;
    isFirstLogin: boolean;
}

export type UserInfoArray = Array<UserInfo>