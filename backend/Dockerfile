FROM python:3.9-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
RUN apk update && apk add bash && pip install pipenv
COPY Pipfile /backend/
RUN cd /backend && pipenv lock --requirements > requirements.txt
RUN pip install -r /backend/requirements.txt
COPY . /backend/
RUN python3 manage.py makemigrations users_and_groups
RUN python3 manage.py migrate users_and_groups
EXPOSE 8000
# CMD ["python3", "manage.py", "migrate"]