const { exec } = require("child_process");

function checkPostgres() {
  exec(
    "docker exec book_end_api_db pg_isready --host localhost",
    (error, stdout) => {
      if (stdout.includes("accepting connections")) {
        console.log("PostgreSQL is ready and accepting connections.");
        return;
      }

      console.log("Waiting for PostgreSQL to be ready...");
      setTimeout(checkPostgres, 1000);
    },
  );
}

checkPostgres();
