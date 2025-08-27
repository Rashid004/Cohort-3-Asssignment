import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

const client = new Client(
  "postgresql://neondb_owner:npg_CjHf2sxcYRK1@ep-dry-rice-ady3iwva-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

async function main() {
  await client.connect();
  const res = await client.query("SELECT * FROM users");
  console.log(res.rows);
}
main();

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, street, city, country, pincode } =
      req.body;

    const query = `INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING id`;
    const queryAddress = `INSERT INTO addresses (user_id, street, city, country, pincode) VALUES ($1, $2, $3, $4, $5)`;

    await client.query("BEGIN");

    const response = await client.query(query, [username, email, password]);
    const userId = response.rows[0]?.id;
    const addressResponse = await client.query(queryAddress, [
      userId,
      street,
      city,
      country,
      pincode,
    ]);
    await client.query("COMMIT");

    console.log(addressResponse.rows);
    res.status(201).send({ message: "User created successfully", response });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  const query = "SELECT * FROM users";
  const response = await client.query(query);
  console.log(response.rows);
  res.status(200).send({ message: "Users retrieved successfully", response });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
