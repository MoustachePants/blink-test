# Jira Integration CLI

A command-line interface application for interacting with Jira's REST API. Currently supports retrieving and creating issues.

## Prerequisites

- Node.js installed
- Jira account with API access
- Jira API token

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with:

```
JIRA_BASE_URL=<your-jira-base-url>
JIRA_API_TOKEN=<your-api-token>
```

## Features

- Get issue details by ID or key
- Create new issues
- Error handling for API calls
- Interactive CLI prompts

## Usage

Start the application:

```bash
node app.js
```

Follow the interactive prompts to:

1. Enter your Jira domain
2. Provide user email
3. Input API token
4. Select desired operation

## Project Structure

```
.
├── app.js                     # Main application file
├── userInputQuestions.js      # CLI prompt configurations
└── utils/
    ├── log.js                # Logging utility
    ├── getUserInputs.js      # Input handling
    └── APICallErrorHandler.js # Error handling wrapper
```

## Dependencies

- inquirer - Interactive CLI prompts
- axios - HTTP client
- dotenv - Environment variable management

## Error Handling

The application includes a wrapper for API calls that handles common Jira API errors and authentication issues.

## Limitations

- Currently supports basic issue operations only
- Requires Jira account permissions for respective operations

## Contributing

Pull requests welcome. Please ensure to update tests as appropriate.

## License

MIT
