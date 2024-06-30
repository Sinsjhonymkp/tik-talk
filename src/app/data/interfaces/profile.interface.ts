export interface Iprofile {
    avatarUrl: string | null,
    city: string | null,
    description: string,
    firstName: string,
    lastName: string,
    id: number| undefined,
    isActive: boolean,
    stack: string[],
    subscribersAmount: number,
    username: string
}

export interface IMenuItems {
    label: string,
    icon: string,
    link: string,
}

export type FormSettings =  Pick<Iprofile, 'description' | 'firstName' | 'lastName'  |'stack' | 'username'>

