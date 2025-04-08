from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    if lesson_id == 1:
        return render_template('lesson.html')
    elif lesson_id == 2:
        return render_template('pattern_lesson.html')
    else:
        return redirect(url_for('home'))

@app.route('/pattern-lesson')
def pattern_lesson():
    return render_template('pattern_lesson.html')

if __name__ == '__main__':
    app.run(debug=True)
