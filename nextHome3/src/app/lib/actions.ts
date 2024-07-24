"use server"

import { PartialUser } from "./types"
import bcrypt, { hash } from "bcrypt";
import { nanoid } from "nanoid";
import { addUser, getAllUsers, getUserByLogin } from "./api";
import { redirect } from "next/navigation";


export const handleSignup = async (prev: unknown, data: FormData) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; 

    const name = data.get("name") as string;
    const surname = data.get("surname") as string;
    const login = data.get("login") as string;
    const password = data.get("password") as string;

    if (!name || !surname || !login || !password) {
        return {
            message: "Please fill all the fields"
        };
    }

    const existingUser = await getUserByLogin(login);

    if (existingUser) {
        return {
            message: "User already exists with this login"
        };
    }

    if (!reg.test(password)) {
        return {
            message: "Please write a strong password (minimum 8 characters)"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: PartialUser = {
        id: nanoid(),
        name: name,
        surname: surname,
        login: login,
        password: hashedPassword,
    };

    addUser(newUser);

     redirect("/login");
};

export const handleLogin = async (prev: unknown, data: FormData) => {
    const login = data.get("login") as string;
    const password = data.get("password") as string;

    if (!login || !password) {
        return {
            message: "Please fill all the fields"
        };
    }

    const user = await getUserByLogin(login);

    if (!user) {
        return {
            message: "User not found"
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return {
            message: "Incorrect password"
        };
    }

     redirect("/profile");
};
