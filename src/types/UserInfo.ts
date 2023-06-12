export interface UserInfo {
    email: string;
    password: string;
    notes: {
        title: string;
        tags: string[];
        content: string;
    }[];
    username: string;
    signature: string;
    isFirstLogin: boolean;
}

export type UserInfoArray = Array<UserInfo>