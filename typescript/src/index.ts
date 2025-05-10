interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

type UpdateUser = Pick<User, "name" | "age" | "password">;

type UserRecord = Record<string, User>;

const user: UserRecord = {
  rashid: {
    age: 25,
    name: "Rashid004",
    email: "rashidansari3868038@gmail.com",
    password: "123456789",
  },
  zaid: {
    age: 25,
    name: "Rashid004",
    email: "rashidansari3868038@gmail.com",
    password: "123456789",
  },
};

user.rashid.age = 26;
console.log(user.rashid.age);
