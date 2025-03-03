# Job postal test BEO

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository

Clone the code from the master branch:

### 3. Run the Command  to install all the package.

```bash
NPM install
```

### Config .env file sample is provided us that with your credential as mentioned in mail
```bash
PORT=
DB_DIALECT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=


SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### 2. The table is alrady in the db personalturm-test 

```bash
No need to migration on DB
```

### 3. Run the Command  to run the code.

```bash
npm run dev // npm start
```

### 4. Shedule Cron job 

```bash
the shedule task will be runing as the cron time is implimented.
the cron job is set the /cron folder
```

### 5. Documentation of the API

The documentation is set in the 

```bash
http://localhost:${port}/api-docs
```

the port will be as per defined in the ENV file

