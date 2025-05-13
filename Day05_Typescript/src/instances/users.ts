import { Manager, Student, User } from "../models/user";

class Users {
    private static instance: Users
    private users: User[] = []

    private constructor() { }

    public static getInstance(): Users {
        if (!Users.instance) {
            Users.instance = new Users()
        }
        return Users.instance;
    }

    async addUser(username: string, password: string, role: 'Manager' | 'Student'): Promise<void> {
        if (role === 'Manager') {
            const user = await Manager.create(username, password)
            if (user) this.users.push(user)
        }
        if (role === 'Student') {
            const user = await Student.create(username, password)
            if (user) this.users.push(user)
        }
    }

    findUser(username: string): User | undefined {
        return this.users.find(u => u.getUsername() === username)
    }

    async login(username: string, password: string): Promise<User | null> {
        const user = this.findUser(username);
        if (!user) return null

        const isLogin = await user.comparePassword(password)
        if (!isLogin) return null

        return user
    }
}
export default Users