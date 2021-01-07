FROM python:3.9-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
RUN apk update && apk add bash && pip install pipenv
COPY Pipfile /backend/
RUN cd /backend && pipenv lock --requirements > requirements.txt
RUN pip install -r /backend/requirements.txt
RUN python3 manage.py makemigrations && python3 manage.py migrate
COPY . /backend/
EXPOSE 8000
# CMD ["python3", "manage.py", "migrate"]