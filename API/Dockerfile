FROM alpine:3.10

RUN apk add --no-cache python3-dev \
    && pip3 install --upgrade pip

WORKDIR /app

COPY wyjapp /app

RUN pip3 --no-cache-dir install -r requirements.txt

CMD ["python3", "w&japp/app.py"]
