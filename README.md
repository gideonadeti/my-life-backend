# Express Back-End Template

A template for building Express back-end applications with TypeScript and Prisma ORM.

## Getting Started

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Configure Project Settings**:
   - Open the `package.json` file.
   - Update the `name` and `description` fields.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   - Create a `.env` file in the project root.
   - Define necessary environment variables (e.g., `DATABASE_URL`).

5. **Database Configuration**:
   - Add models to the `schema.prisma` file.
   - Initialize the database:
     ```bash
     npx prisma migrate dev --name init
     ```
   - For schema changes, apply migrations with:
     ```bash
     npx prisma migrate dev --name <migration-name>
     ```

6. **Database Interaction**:
   - Utilize the `db.ts` file for database queries.

7. **Run Development Server**:
   ```bash
   npm run dev
   ```

8. **Additional Notes**:
   - Ensure all environment variables are correctly set before starting the server.
   - Consult the Prisma documentation for advanced database configurations.
