# TemplateForge: Automated Prompt Engineering for Generative Web Development[cite: 1]

TemplateForge is a web application that provides 50 unique responsive website templates alongside a powerful AI prompt generator[cite: 1]. The platform is designed to streamline web development by combining ready-to-use templates with generative AI tools[cite: 1].

## Key Features

* **Extensive Template Collection:** Explore a GitHub Template Library featuring over 170+ HTML5 templates[cite: 1].
* **Live Previews & ZIP Downloads:** View fast, CSS-only live previews and download individual templates as ZIP packages directly from the original public repository[cite: 1].
* **7-Step AI Prompt Wizard:** An interactive UI wizard that captures user inputs (such as website type, design style, color scheme, and tech stack) to formulate precise prompts[cite: 1, 2].
* **Secure API Integration:** Safely stores your API key in Local Storage and utilizes an API dispatcher to asynchronously fetch responses from OpenRouter / LLM Inference services[cite: 2].
* **Automated Code Generation:** The Prompt Compiler Engine synthesizes your choices and generates production-ready website code for you to copy or export[cite: 1, 2].

## File Structure

* **`index.html`**: The main container file for the app, which links the CSS and JavaScript together and imports the external JSZip library[cite: 1].
* **`style.css`**: Handles all application design, layouts, Dark Mode styling, and professional motion animations[cite: 1].
* **`main.js`**: Drives the core logic, including GitHub template fetching, ZIP generation, the prompt compiler engine, and the API dispatcher[cite: 1, 2].

## System Workflow

The following block diagram highlights the core flow of the application[cite: 2]:

```text
+-------------------+      +-------------------+
|    USER INPUT     |      |   LOCAL STORAGE   |
| (7-Step UI Wizard)|      |  (Secure API Key) |
+---------+---------+      +---------+---------+
          |                          |
          |                          |
          v                          v
+----------------------------------------------+
|           PROMPT COMPILER ENGINE             |
|      (Aggregates Data & Formats Prompt)      |
+----------------------+-----------------------+
                       |
                       v
+----------------------------------------------+
|             API DISPATCHER                   |
|     (Asynchronous Fetch & UI Animations)     |
+----------------------+-----------------------+
                       |
                       v
+----------------------------------------------+
|         EXTERNAL AI CLOUD SERVICE            |
|        (OpenRouter / LLM Inference)          |
+----------------------+-----------------------+
                       |
                       v
+----------------------------------------------+
|                FINAL OUTPUT                  |
|       (Generated Prompt & Export Tools)      |
+----------------------------------------------+
```[cite: 2]
