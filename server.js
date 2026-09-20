const http = require("http");
const fs = require("fs");

function handler(req, res) {
  const { url, method } = req;

  // QUESTION 1: Create a new user

  if (url === "/user" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newUser;

      try {
        newUser = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        res.write(
          JSON.stringify({
            message: "Please send valid JSON data",
            success: false,
          }),
        );

        return res.end();
      }

      // Read users 
      const users = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

      // Check that all exists
      if (!newUser.name || newUser.age === undefined || !newUser.email) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        res.write(
          JSON.stringify({
            message: "name, age and email are required",
            success: false,
          }),
        );

        return res.end();
      }

      for (const id in users) {
        if (users[id].email === newUser.email) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          res.write(
            JSON.stringify({
              message: "Email already exists",
              success: false,
            }),
          );

          return res.end();
        }
      }

      // Find the highest existing id and add 1
      let newId = 1;

      for (const id in users) {
        if (Number(id) >= newId) {
          newId = Number(id) + 1;
        }
      }

      newUser.id = newId;

      // Add the user
      users[newId] = newUser;

      // Save the updated users in the file
      fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

      res.writeHead(201, {
        "Content-Type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "User added successfully",
          success: true,
          user: newUser,
        }),
      );

      res.end();
    });
  }

  // QUESTION 2: PATCH /user/id
  else if (url.startsWith("/user/") && method === "PATCH") {
    const id = url.split("/")[2];

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const updatedUser = JSON.parse(body);

      const users = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

      if (!users[id]) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });

        res.write(
          JSON.stringify({
            message: "User not found",
            success: false,
          }),
        );

        return res.end();
      }

      // Check if the new email already belongs to another user
      if (updatedUser.email !== undefined) {
        for (const userId in users) {
          if (userId !== id && users[userId].email === updatedUser.email) {
            res.writeHead(400, {
              "Content-Type": "application/json",
            });

            res.write(
              JSON.stringify({
                message: "Email already exists",
                success: false,
              }),
            );

            return res.end();
          }
        }
      }

      // Update only the values sent in the request
      if (updatedUser.name !== undefined) {
        users[id].name = updatedUser.name;
      }

      if (updatedUser.age !== undefined) {
        users[id].age = updatedUser.age;
      }

      if (updatedUser.email !== undefined) {
        users[id].email = updatedUser.email;
      }

      fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "User updated successfully",
          success: true,
          user: users[id],
        }),
      );

      res.end();
    });
  }

  // QUESTION 3: DELETE /user/id
  else if (url.startsWith("/user/") && method === "DELETE") {
    const id = url.split("/")[2];

    const users = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

    if (!users[id]) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "User not found",
          success: false,
        }),
      );

      return res.end();
    }

    delete users[id];

    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.write(
      JSON.stringify({
        message: "User deleted successfully",
        success: true,
      }),
    );

    res.end();
  }

  // QUESTION 4: GET /user
  else if (url === "/user" && method === "GET") {
    const data = fs.readFileSync("./db/users.json");

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.write(data);
    res.end();
  }

  // QUESTION 5: GET /user/id
  else if (url.startsWith("/user/") && method === "GET") {
    const id = url.split("/")[2];

    const users = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

    if (!users[id]) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "User not found",
          success: false,
        }),
      );

      return res.end();
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.write(
      JSON.stringify({
        success: true,
        user: users[id],
      }),
    );

    res.end();
  }

  // INVALID REQUEST
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.write(
      JSON.stringify({
        message: "Invalid request",
        success: false,
      }),
    );

    res.end();
  }
}

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
