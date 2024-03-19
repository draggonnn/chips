from flask import Flask, render_template, request
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)

def send_email(email):
    # Configurações de envio de e-mail
    smtp_server = 'smtp.example.com'
    smtp_port = 587
    smtp_username = 'your_smtp_username'
    smtp_password = 'your_smtp_password'
    sender_email = 'your_sender_email@example.com'
    receiver_email = email

    # Construindo o e-mail
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = 'Confirmação de Inscrição'

    body = 'Olá! Obrigado por se inscrever em nosso serviço de chips maturados. Esperamos que goste dos nossos produtos!'
    msg.attach(MIMEText(body, 'plain'))

    # Enviando o e-mail
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print("Erro ao enviar e-mail:", e)
        return False

@app.route('/process', methods=['POST'])
def process():
    email = request.form['email']
    if send_email(email):
        return 'E-mail {} registrado com sucesso! Verifique sua caixa de entrada para a confirmação.'.format(email)
    else:
        return 'Houve um erro ao processar seu pedido. Por favor, tente novamente mais tarde.'

if __name__ == '__main__':
    app.run(debug=True)
