const http = require("http");

const crypto = require("crypto");

const db = require("./db");

const {
  validateUser,
} = require("./validate");

const server = http.createServer(
  async (req, res) => {

    try {

      
      // GET /users
      
      if (
        req.method === "GET" &&
        req.url.startsWith("/users")
      ) {

        const url = new URL(
          req.url,
          `http://${req.headers.host}`
        );

        // Query params
        const page =
          Number(
            url.searchParams.get("page")
          ) || 1;

        const limit =
          Number(
            url.searchParams.get("limit")
          ) || 5;

        const role =
          url.searchParams.get("role");

        const search =
          url.searchParams.get("search");

        const sort =
          url.searchParams.get("sort");

        const order =
          url.searchParams.get("order") || "asc";

        // Get users
        let users =
          await db.getAllUsers();

        // FILTERING
        
        if (role) {

          users = users.filter(
            (user) =>
              user.role === role
          );
        }

        // SEARCH

        if (search) {

          users = users.filter(
            (user) =>

              user.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )

              ||

              user.email
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );
        }

       
        // SORTING
    
        if (sort) {

          users.sort((a, b) => {

            const valueA =
              a[sort];

            const valueB =
              b[sort];

            if (
              order === "desc"
            ) {

              return valueA <
                valueB
                ? 1
                : -1;
            }

            return valueA >
              valueB
              ? 1
              : -1;
          });
        }

      
        // PAGINATION
        
        const startIndex =
          (page - 1) * limit;

        const endIndex =
          startIndex + limit;

        const paginatedUsers =
          users.slice(
            startIndex,
            endIndex
          );

        // Response
        res.statusCode = 200;

        res.setHeader(
          "Content-Type",
          "application/json"
        );

        return res.end(
          JSON.stringify({
            data: paginatedUsers,
            total: users.length,
            page,
            limit,
          })
        );
      }

     
      // POST /users
      

      if (
        req.method === "POST" &&
        req.url === "/users"
      ) {

        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", async () => {

          body = JSON.parse(body);

          const result =
            validateUser(body);

          if (!result.valid) {

            res.statusCode = 400;

            return res.end(
              JSON.stringify({
                errors:
                  result.errors,
              })
            );
          }

          const users =
            await db.getAllUsers();

          const newUser = {
            id:
              crypto.randomUUID(),
            ...body,
            createdAt:
              new Date().toISOString(),
          };

          users.push(newUser);

          await db.saveUsers(users);

          res.statusCode = 201;

          res.setHeader(
            "Content-Type",
            "application/json"
          );

          res.end(
            JSON.stringify(newUser)
          );
        });

        return;
      }

      // 404 ROUTE
      
      res.statusCode = 404;

      res.end("Route Not Found");

    }
    catch (error) {

      console.error(error);

      res.statusCode = 500;

      res.setHeader(
        "Content-Type",
        "application/json"
      );

      res.end(
        JSON.stringify({
          error:
            "Internal Server Error",
        })
      );
    }
  }
);

server.listen(3000, () => {

  console.log(
    "Server running on port 3000"
  );
});