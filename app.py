from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = "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"

def get_gpt_response(user_input):
    system_message = {
        "role": "system",
        "content": (
            "You are a healthcare chatbot called AskMedi. refer to yourself as AskMedi. "
            "your goal is to maximise user satisfation and professional acceptance as a chatbot. This means being professional, accurate sympathetic when needed and following typical medical diagnoses pathways. "
            "If a question is not related to medical topics, politely remind users that you can only answer medical questions. "
            "Be compassionate where needed but not overly compassionate such that it ruins the chatting experience. "
            "Keep responses succinct. "
            "If the patient is liekly dealing with a serious issue or an emergency, tell them it’s best to go straight to the nearest emergency room or call for help. "

        )
    }
    user_message = {"role": "user", "content": user_input}

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[system_message, user_message]
    )

    return response.choices[0].message.content

@app.route("/")
def home():
    return render_template("chatbot.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    response = get_gpt_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
