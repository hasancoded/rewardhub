# Contributing to RewardHub

Thank you for your interest in contributing to RewardHub! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- Clear, descriptive title
- Detailed description of the proposed functionality
- Explanation of why this enhancement would be useful
- Possible implementation approach

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

## Development Setup

1. Clone your fork:

   ```bash
   git clone https://github.com/your-username/RewardHub.git
   cd RewardHub
   ```

2. Install dependencies:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables (see README.md)

4. Start development servers (see README.md)

## Coding Standards

### JavaScript/Vue.js

- Use ES6+ syntax
- Follow Vue 3 Composition API patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await for asynchronous operations

### Solidity

- Follow Solidity style guide
- Use OpenZeppelin contracts where applicable
- Add NatSpec comments for all public functions
- Implement proper access control
- Test thoroughly before deployment

### General

- Use 2 spaces for indentation
- No trailing whitespace
- Use semicolons in JavaScript
- Keep lines under 100 characters when possible
- Write self-documenting code

## Commit Message Guidelines

Format: `<type>: <subject>`

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat: Add wallet connection status indicator
fix: Resolve token balance display issue
docs: Update API documentation for redemptions
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm run test:unit
npm run test:e2e
```

## Documentation

- Update README.md if adding new features
- Update API documentation for new endpoints
- Add inline code comments for complex logic
- Update environment variable documentation

## Pull Request Process

1. Ensure your code follows the coding standards
2. Update documentation as needed
3. Add tests for new functionality
4. Ensure all tests pass
5. Update the README.md with details of changes if applicable
6. The PR will be merged once approved by maintainers

## Questions?

Feel free to open an issue for any questions or clarifications needed.

Thank you for contributing to RewardHub!
