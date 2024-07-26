"use server";

import { OptionalUser } from "./types";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import { addUser, getUpdateUserLogin, getUserByLogin } from "./api";
import { redirect } from "next/navigation";
import { createAuthSession, destroySession } from "./auth";

const handleErrors = (message: string) => ({ message });

export const handleSignup = async (prev: unknown, data: FormData) => {
    const name = data.get('name') as string;
    const surname = data.get('surname') as string;
    const login = data.get('login') as string;
    const password = data.get('password') as string;

    if (!name || !surname || !login || !password) {
        return handleErrors("Please fill all the fields");
    }

    const existingUser = await getUserByLogin(login)
    if (existingUser) {
        return handleErrors("Login is busy!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: OptionalUser = {
        id: nanoid(),
        name,
        surname,
        login,
        password: hashedPassword,
    }

    await addUser(user)
    redirect("/login")
}

export const handleLogin = async (prev: unknown, data: FormData) => {
    const login = data.get('login') as string;
    const password = data.get('password') as string;

    if (!login || !password) {
        return handleErrors("Please fill all the fields");
    }

    const user = await getUserByLogin(login)
    if (!user) {
        return handleErrors("The login is incorrect!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return handleErrors("Password is wrong!");
    }

    await createAuthSession(user.id)
    redirect("/profile")
}

export const handleLogout = async () => {
    await destroySession()
    redirect("/login")
}

export const handleSettings = async (prev: unknown, data: FormData) => {
    const login = data.get("login") as string;
    const password = data.get("password") as string;
    const newLogin = data.get("newLogin") as string;

    if (!login || !newLogin || !password) {
        return handleErrors("Please fill all the fields");
    }

    const user = await getUserByLogin(login);
    if (!user) {
        return handleErrors("User not found!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return handleErrors("Password is wrong!");
    }

    const existingUser = await getUserByLogin(newLogin);
    if (existingUser) {
        return handleErrors("Login is already busy");
    }

    await getUpdateUserLogin(user.id, newLogin)
    await destroySession()
    redirect("/login")
}
