import os
import json
import streamlit as st
from openai import OpenAI

st.set_page_config(page_title="AI Code Reviewer & Refactorer",
                   page_icon="🚀", layout="centered")
st.title("AI Code Reviewer & Refactorer")
st.caption("Review, refactor, and improve your code with AI-powered insights.")

with st.sidebar:
    st.header("Settings")
    api_key = st.secrets.get("API_KEY", "") or os.getenv(
        "API_KEY", "") or st.text_input("API Key", type="password")
    base_url = st.secrets.get("BASE_URL", "") or os.getenv(
        "BASE_URL", "https://api.groq.com/openai/v1")
    model = st.secrets.get("MODEL", "") or os.getenv(
        "MODEL", "llama-3.3-70b-versatile")

# [APP SPECIFIC: UI INPUTS GO HERE]
language_options = {
    "Python": "python",
    "R": "r",
    "C++": "cpp",
    "Java": "java",
    "JavaScript": "javascript",
    "Go": "go",
    "HTML": "html"
}

language_display = st.selectbox(
    "Programming Language", list(language_options.keys()))
language = language_options[language_display]

goal = st.selectbox("Goal", ["Optimize Performance",
                    "Fix Bugs", "Add Comments", "Refactor for Readability"])
code_snippet = st.text_area(
    "Code Snippet", height=250, placeholder="Paste your code here...")

generate = st.button("Generate", type="primary", use_container_width=True)


def build_prompt():
    return f"""Act as a Senior Software Engineer. Review the following {language} code with the goal to: {goal}.

Code:
{code_snippet}

Respond ONLY with valid JSON in this exact format:
{{
  "refactored_code": "the improved code block",
  "review_summary": "brief 1-2 sentence summary of changes",
  "issues_found": ["issue 1", "issue 2"],
  "best_practices_tips": ["tip 1", "tip 2"]
}}"""


def generate_content(prompt):
    if not api_key:
        st.error("Please add your API key.")
        st.stop()

    client = OpenAI(api_key=api_key, base_url=base_url)
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a Senior Software Engineer. You MUST respond ONLY with valid JSON. No markdown, no extra text, no explanations outside the JSON object."},
            {"role": "user", "content": prompt}
        ]
    )
    raw = response.choices[0].message.content.strip().replace(
        "```json", "").replace("```", "").strip()
    return json.loads(raw)


if generate:
    if not code_snippet.strip():
        st.error("Please enter a code snippet to review.")
    else:
        with st.spinner("Processing..."):
            try:
                result = generate_content(build_prompt())

                # [APP SPECIFIC: OUTPUT DISPLAY GOES HERE]
                st.code(result["refactored_code"], language=language)

                st.write("### 📝 Review Summary")
                st.write(result["review_summary"])

                st.write("### 🐛 Issues Found")
                st.json(result["issues_found"])

                st.write("### 💡 Best Practices Tips")
                st.json(result["best_practices_tips"])

                st.success("Done!")

            except json.JSONDecodeError:
                st.error(
                    "The model returned an invalid JSON format. Please try again.")
            except Exception as e:
                st.error(f"Error: {e}")
