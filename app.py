from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    return render_template('lesson.html', lesson_id=lesson_id)

if __name__ == '__main__':
    app.run(debug=True)
