## Cristian Valle

### Requirements
Ensure you have these ready
* Sign up for an account on the **ElephantSQL** (or preferred service) website for a new PostgreSQL database.
* **Node.js**: This application requires Node.js runtime environment to execute JavaScript code on the server side
 

### Getting started

1. **Clone the Repository**: Use the following command to clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**: Run this command to install dependencies:
    ```bash
    npm install
   ```
   
3. **Configure App**: Add needed variable in the environmental file:
    ```bash
    DB_URL = <insert_postgreSQL_connection_url>
    ```
4. **Intialize Database**: Add data to database
    ```bash
    psql -d $DB_URL -f db/schema.sql
    psql -d $DB_URL -f db/seeds.sql
    ```

4. **Start**: Start the server using:
    ```bash
    npm start
   ```

Visit [http://localhost:8000](http://localhost:8000) to access the server.

**Note:** The default port is set to `8000`.


### Routes / Methods

- **GET** - `/`: Health check - ensures the server is running.
    - **Response:** Returns a status of 200 OK if the server is running.
- **GET** - `/raffles`: Retrieves all raffles in the database.
    - **Response:** Returns a JSON array containing details of all raffles.
- **POST** - `/raffles`: Creates a new raffle.
    - **Request Body:** Expects a JSON payload with details of the new raffle.
    - **Response:** Returns the created raffle.
- **GET** - `/raffles/:id`: Retrieves a raffle by its ID.
    - **Response:** Returns the details of the requested raffle if found.
- **GET** - `/raffles/:id/participants`: Retrieves a raffle participants by its ID.
    - **Response:** Returns the participants of the requested raffle if found.
- **POST** - `/raffles/:id/participants`: Enters a participant to the raffle.
    - **Request Body:** Expects a JSON payload with details of the participant joining.
    - **Response:** Returns the created participant.
- **GET** - `/raffles/:id/winner`: Retrieves the winner of the raffle.
    - **Response:** Returns a JSON array containing details of the winner.
- **PUT** - `/raffles/:id/winner`: Ends the raffle and selects a winner.
    - **Response:** Returns the updated raffle with winner id.
