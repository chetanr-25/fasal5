#!/usr/bin/env node

/**
 * Script to generate API documentation in Markdown format from Swagger spec
 * Run with: node scripts/generate-api-docs.js
 */

const fs = require('fs');
const path = require('path');

// Import the swagger spec
require('@babel/register')({
  extensions: ['.js', '.ts'],
  presets: ['@babel/preset-env', '@babel/preset-typescript']
});

const swaggerSpec = require('../src/config/swagger.config').default;

// Function to generate markdown documentation
function generateMarkdownDocs(spec) {
  let markdown = `# ${spec.info.title} API Documentation\n\n`;
  markdown += `Version: ${spec.info.version}\n\n`;
  markdown += `${spec.info.description}\n\n`;
  
  // Add server information
  markdown += `## Servers\n\n`;
  spec.servers.forEach(server => {
    markdown += `* ${server.description}: ${server.url}\n`;
  });
  markdown += '\n';
  
  // Add authentication information if available
  if (spec.components && spec.components.securitySchemes) {
    markdown += `## Authentication\n\n`;
    Object.entries(spec.components.securitySchemes).forEach(([key, scheme]) => {
      markdown += `### ${key}\n\n`;
      markdown += `Type: ${scheme.type}\n`;
      if (scheme.scheme) markdown += `Scheme: ${scheme.scheme}\n`;
      if (scheme.bearerFormat) markdown += `Format: ${scheme.bearerFormat}\n`;
      markdown += '\n';
    });
  }
  
  // Add paths/endpoints
  markdown += `## Endpoints\n\n`;
  Object.entries(spec.paths).forEach(([path, methods]) => {
    markdown += `### ${path}\n\n`;
    
    Object.entries(methods).forEach(([method, operation]) => {
      markdown += `#### ${method.toUpperCase()}\n\n`;
      
      if (operation.summary) markdown += `**Summary:** ${operation.summary}\n\n`;
      if (operation.description) markdown += `**Description:** ${operation.description}\n\n`;
      
      // Parameters
      if (operation.parameters && operation.parameters.length > 0) {
        markdown += `**Parameters:**\n\n`;
        markdown += `| Name | Located in | Description | Required | Schema |\n`;
        markdown += `| ---- | ---------- | ----------- | -------- | ------ |\n`;
        
        operation.parameters.forEach(param => {
          const required = param.required ? 'Yes' : 'No';
          const schema = param.schema ? param.schema.type : '';
          markdown += `| ${param.name} | ${param.in} | ${param.description || ''} | ${required} | ${schema} |\n`;
        });
        markdown += '\n';
      }
      
      // Request body
      if (operation.requestBody) {
        markdown += `**Request Body:**\n\n`;
        const content = operation.requestBody.content;
        if (content && content['application/json']) {
          markdown += `Content Type: application/json\n\n`;
          const schema = content['application/json'].schema;
          if (schema) {
            if (schema.$ref) {
              const refName = schema.$ref.split('/').pop();
              markdown += `Schema: ${refName}\n\n`;
            } else if (schema.properties) {
              markdown += `| Property | Type | Description | Required |\n`;
              markdown += `| -------- | ---- | ----------- | -------- |\n`;
              
              Object.entries(schema.properties).forEach(([propName, prop]) => {
                const required = schema.required && schema.required.includes(propName) ? 'Yes' : 'No';
                const type = prop.type || (prop.$ref ? prop.$ref.split('/').pop() : '');
                markdown += `| ${propName} | ${type} | ${prop.description || ''} | ${required} |\n`;
              });
              markdown += '\n';
            }
          }
        }
      }
      
      // Responses
      if (operation.responses) {
        markdown += `**Responses:**\n\n`;
        markdown += `| Code | Description |\n`;
        markdown += `| ---- | ----------- |\n`;
        
        Object.entries(operation.responses).forEach(([code, response]) => {
          markdown += `| ${code} | ${response.description || ''} |\n`;
        });
        markdown += '\n';
      }
      
      // Security
      if (operation.security && operation.security.length > 0) {
        markdown += `**Security:**\n\n`;
        operation.security.forEach(securityRequirement => {
          Object.keys(securityRequirement).forEach(key => {
            markdown += `* ${key}\n`;
          });
        });
        markdown += '\n';
      }
    });
  });
  
  // Add schemas/models
  if (spec.components && spec.components.schemas) {
    markdown += `## Models\n\n`;
    
    Object.entries(spec.components.schemas).forEach(([name, schema]) => {
      markdown += `### ${name}\n\n`;
      
      if (schema.properties) {
        markdown += `| Property | Type | Description | Required |\n`;
        markdown += `| -------- | ---- | ----------- | -------- |\n`;
        
        Object.entries(schema.properties).forEach(([propName, prop]) => {
          const required = schema.required && schema.required.includes(propName) ? 'Yes' : 'No';
          let type = prop.type || '';
          if (prop.enum) type += ` (enum: ${prop.enum.join(', ')})`;
          if (prop.format) type += ` (${prop.format})`;
          
          markdown += `| ${propName} | ${type} | ${prop.description || ''} | ${required} |\n`;
        });
      }
      
      markdown += '\n';
    });
  }
  
  return markdown;
}

// Generate the markdown
const markdown = generateMarkdownDocs(swaggerSpec);

// Write to file
const outputPath = path.join(__dirname, '../docs/api-documentation.md');

// Create docs directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, '../docs'))) {
  fs.mkdirSync(path.join(__dirname, '../docs'));
}

fs.writeFileSync(outputPath, markdown);

console.log(`API documentation generated at ${outputPath}`);