# 🚀 AI Code Reviewer & Refactorer

## 1. Project Definition
The **AI Code Reviewer & Refactorer** is a lightweight, interactive web application built with Python and Streamlit. It leverages Large Language Models (LLMs) via the OpenAI-compatible API (such as Groq) to analyze, review, and automatically refactor code snippets. It enforces strict JSON output from the AI to ensure reliable, structured, and easily renderable feedback directly in the user interface.

## 2. Purpose
The primary purpose of this project is to democratize access to senior-level code review. It aims to:
- Help developers write cleaner, more efficient, and maintainable code.
- Reduce the time spent on manual debugging and code formatting.
- Provide immediate, actionable feedback and educational tips on coding best practices.
- Offer a customizable, goal-oriented refactoring experience (e.g., optimizing performance, fixing bugs, or adding comments).

## 3. Daily Life Use Cases
This application is highly versatile and can be integrated into various daily workflows:
- **Students & Beginners**: Paste homework or practice code to understand *why* it might be inefficient and learn best practices through the "Best Practices Tips" section.
- **Professional Developers**: Quickly sanity-check a complex function before committing it to a repository, ensuring it meets readability and performance standards.
- **Freelancers & Solopreneurs**: Speed up debugging and refactoring tasks when working alone without a dedicated peer-review team.
- **Tech Interview Preparation**: Candidates can paste their practice solutions to see how an AI would optimize their logic or point out edge-case bugs.
- **Legacy Code Modernization**: Quickly add comments or refactor old, unreadable scripts into modern, clean formats.

## 4. Key Features
- 🌐 **Multi-Language Support**: Python, R, C++, Java, JavaScript, Go, and HTML.
- 🎯 **Goal-Oriented Refactoring**: Choose specific goals like "Optimize Performance", "Fix Bugs", "Add Comments", or "Refactor for Readability".
- 🛡️ **Robust Parsing**: Uses strict system prompts and string cleaning to guarantee valid JSON responses, preventing UI crashes from Markdown-wrapped AI outputs.
- ⚙️ **Flexible Configuration**: Supports API keys and base URLs via Streamlit Secrets, Environment Variables, or direct UI input (great for testing different providers like Groq, OpenAI, or local Ollama instances).

## 5. Tech Stack
- **Frontend/UI**: Streamlit
- **Backend Logic**: Python
- **AI Integration**: `openai` Python SDK (compatible with any OpenAI-API-compliant endpoint)

---
