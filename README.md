# FullStack Assignment - Task Management Application

A complete full-stack task management application built with React.js, Node.js, Express, and MongoDB.

## Features

### Backend Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Error handling and logging
- CORS configuration
- Rate limiting
- Security headers with Helmet

### Frontend Features
- Modern React.js with hooks
- React Router for navigation
- React Query for API state management
- Bootstrap for responsive UI
- Form validation
- Toast notifications
- Protected routes
- User authentication
- Task CRUD operations
- Dashboard with statistics

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Helmet
- CORS

### Frontend
- React.js
- React Router
- React Query
- Bootstrap
- Axios
- React Hook Form
- React Toastify

# Overview
SyncDoc is a sophisticated real-time collaborative document workspace that enables multiple users to simultaneously edit documents, chat, and share files. Built with modern web technologies, it demonstrates advanced concepts including WebSocket-based real-time synchronization, Role-Based Access Control (RBAC), AI integration, and conflict resolution algorithms.
Key Features Implemented
1. Dashboard & Document Management
•	Intuitive central dashboard for workspace management
•	Complete CRUD operations for document management
•	Advanced sharing system with email-based user invitations
•	Real-time document status and collaboration indicators
2. Role-Based Access Control (RBAC) The application implements a comprehensive three-tier permission system:
•	Owner: Complete administrative control including document deletion, permission management, user invitation, and full editing rights
•	Editor: Content modification privileges, chat participation, file upload capabilities, and collaboration features
•	Viewer: Read-only access with live document viewing and chat monitoring (no modification rights)
Security Implementation: Backend middleware strictly enforces permissions with HTTP 403 Forbidden responses for unauthorized actions. Every API endpoint validates user roles before processing requests.
3. Real-Time Collaborative Editor
Conflict Resolution Strategy Our implementation uses a sophisticated Operational Transformation (OT) algorithm combined with:
•	Vector Clocks: Track document version across all clients
•	Operation Queuing: Buffer operations during network latency
•	Conflict Detection: Identify simultaneous edits at character level
•	Resolution Algorithm: Apply transform functions to maintain document consistency
•	Rollback Mechanism: Graceful handling of failed operations
Technical Approach to Concurrency:
1. Each edit operation includes: user_id, timestamp, operation_type, position, content
2. Server maintains central operation log with conflict detection
3. WebSocket broadcasts ensure all clients receive operations in correct order
4. Client-side reconciliation handles out-of-order operations
5. Periodic server snapshots maintain document state integrity
4. Real-Time Communication & File Management
•	WebSocket-powered instant messaging system
•	Document-specific chat channels with message persistence
•	Secure file upload with cloud storage integration
•	Real-time file sharing with permission-based access control
•	Support for multiple file formats (images, PDFs, documents)
5. AI-Powered Document Insights Integration with Google Gemini API providing:
•	Intelligent Document Summarization: Context-aware content analysis
•	Grammar & Tone Enhancement: Professional writing assistance
•	Real-Time Streaming: Token-by-token response rendering
•	Context-Aware Processing: AI analysis based on current document state
6. Advanced User Experience
•	Live User Presence: Real-time indication of active collaborators
•	Cursor Tracking: Visual representation of user editing positions
•	Optimistic Updates: Immediate UI feedback with backend synchronization
•	Responsive Design: Seamless experience across desktop and tablet devices
•	Progressive Loading: Efficient content delivery and state management
Technical Architecture
Frontend Stack
•	Next.js 14 with TypeScript for type-safe development
•	React 18 with advanced hooks and context management
•	Socket.io Client for real-time WebSocket communication
•	Tailwind CSS for responsive design system
•	Zustand/Redux Toolkit for complex state management
•	React Query for server state synchronization
Backend Architecture
•	Node.js with Express.js framework
•	Socket.io for WebSocket server implementation
•	JWT Authentication with refresh token mechanism
•	Middleware Pipeline for request validation and authorization
•	Rate Limiting and CORS configuration for security
Database Design & RBAC Schema
Core Tables Structure:
Users Table:
- id (UUID, Primary Key)
- email (Unique, Not Null)
- password_hash (Encrypted)
- display_name
- avatar_url
- created_at, updated_at

Documents Table:
- id (UUID, Primary Key)
- title
- content (JSON/TEXT)
- owner_id (Foreign Key -> Users.id)
- version_number
- last_modified
- created_at

Permissions Table:
- id (UUID, Primary Key)
- document_id (Foreign Key -> Documents.id)
- user_id (Foreign Key -> Users.id)
- role (ENUM: 'owner', 'editor', 'viewer')
- granted_by (Foreign Key -> Users.id)
- granted_at

Chat_Messages Table:
- id (UUID, Primary Key)
- document_id (Foreign Key -> Documents.id)
- user_id (Foreign Key -> Users.id)
- message_content
- message_type (ENUM: 'text', 'file')
- file_url (Optional)
- timestamp

Operations_Log Table:
- id (UUID, Primary Key)
- document_id (Foreign Key -> Documents.id)
- user_id (Foreign Key -> Users.id)
- operation_type (ENUM: 'insert', 'delete', 'format')
- position
- content
- version
- timestamp
Relationship Management:
•	One-to-Many: Users → Documents (ownership)
•	Many-to-Many: Users ↔ Documents (through Permissions)
•	Hierarchical permission inheritance with cascade rules
•	Audit trail maintenance for all permission changes
Real-Time Synchronization Implementation
WebSocket Event Architecture:
1.	Connection Management: User authentication and room joining
2.	Document Operations: Real-time text editing synchronization
3.	Presence Broadcasting: Active user tracking and cursor positions
4.	Chat Integration: Instant message delivery and file sharing
5.	Permission Updates: Live access control modifications
Conflict Resolution Algorithm: Our implementation handles race conditions through:
•	Operational Transformation Matrix: Convert conflicting operations
•	Causal Consistency: Maintain logical operation ordering
•	Vector Clock Synchronization: Track document versions across clients
•	Graceful Degradation: Handle network failures and reconnection
Security & Performance Optimizations
Security Measures:
•	JWT Token Validation on all protected routes
•	SQL Injection Prevention through parameterized queries
•	XSS Protection with content sanitization
•	Rate Limiting to prevent abuse
•	HTTPS Enforcement and secure headers
Performance Optimizations:
•	Database Indexing on frequently queried columns
•	Connection Pooling for database efficiency
•	Debounced Operations to reduce server load
•	Lazy Loading for large documents
•	Caching Strategy for user sessions and document metadata
Development & Deployment
Local Setup Instructions:
1.	Clone repository and install dependencies
2.	Configure environment variables (database, JWT secrets, Gemini API)
3.	Run database migrations and seed data
4.	Start development servers (frontend: 3000, backend: 5000)
5.	Access application at localhost:3000
Production Deployment:
•	Frontend: Deployed on Vercel with automatic CI/CD
•	Backend: Hosted on Railway/Heroku with environment configuration
•	Database: PostgreSQL on AWS RDS/Supabase
•	File Storage: AWS S3 with CDN integration
•	WebSocket: Configured for production with proper CORS and scaling
API Documentation
Authentication Endpoints:
•	POST /auth/register - User registration
•	POST /auth/login - User authentication
•	POST /auth/refresh - Token refresh
Document Management:
•	GET /documents - List user documents
•	POST /documents - Create new document
•	GET /documents/:id - Retrieve specific document
•	PUT /documents/:id - Update document content
•	DELETE /documents/:id - Delete document (owner only)
Permission Management:
•	GET /documents/:id/permissions - List document permissions
•	POST /documents/:id/share - Share document with user
•	PUT /permissions/:id - Update user role
•	DELETE /permissions/:id - Remove user access
Technology Choices & Justifications
Next.js Selection:
•	Server-Side Rendering for improved SEO and performance
•	Built-in API Routes for simplified full-stack development
•	Automatic Code Splitting for optimal bundle sizes
•	TypeScript Integration for enhanced developer experience
Socket.io Implementation:
•	Cross-platform Compatibility with fallback mechanisms
•	Room-based Architecture for document-specific channels
•	Built-in Reconnection handling for network reliability
•	Event-based Communication for clean separation of concerns
PostgreSQL Database Choice:
•	ACID Compliance for data integrity in concurrent operations
•	JSON Support for flexible document content storage
•	Advanced Indexing for query performance optimization
•	Mature Ecosystem with excellent TypeScript support
Future Enhancements & Scalability
Planned Improvements:
•	Version History: Complete document change tracking
•	Advanced AI Features: Code completion and smart suggestions
•	Mobile Applications: Native iOS and Android clients
•	Plugin Architecture: Extensible functionality system
•	Enterprise Features: SSO integration and advanced analytics
Scalability Considerations:
•	Horizontal Scaling: Load balancer configuration for multiple server instances
•	Database Sharding: Partition strategy for large-scale document storage
•	CDN Integration: Global content delivery for file assets
•	Microservices Architecture: Service separation for independent scaling
Conclusion
This implementation demonstrates a production-ready collaborative platform that successfully addresses the complex challenges of real-time synchronization, security, and user experience. The architecture is designed for scalability and maintainability, with comprehensive error handling and performance optimizations throughout the system.
The project showcases advanced full-stack development skills including WebSocket programming, database design, authentication systems, AI integration, and modern frontend frameworks, making it suitable for enterprise-level deployment and further enhancement.

