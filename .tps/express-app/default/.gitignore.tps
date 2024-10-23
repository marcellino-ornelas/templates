# Node modules
node_modules/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env

# Database files
*.sqlite
*.db

# Build files
dist/
build/

# Dependency directories
jspm_packages/

# IDE specific files
.vscode/
.idea/

# OS generated files
.DS_Store
Thumbs.db

# Coverage directory used by testing tools like Jest or Mocha
coverage/

# Temporary files and directories
tmp/
temp/

# Lock file
{{{? tps.answers.packageManager === 'yarn'}}}
yarn.lock
{{{??}}}
package-lock.json
{{{?}}}
