import { users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";

export const createUser = async (user: CreateUserParams) => {
    try {
        // Adjust the parameters based on the correct method signature
        const newUser = await users.create(ID.unique(), user.name, user.email, user.phone);
    } catch (error: any) {
        // Check existing user
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);
    
            return existingUser.users[0];
        }
    }
}