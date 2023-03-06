pipeline {
    agent {
        docker { image 'node:18.14.2-alpine3.16' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'npm run test'
                sh 'docker -v'
            }
        }
        stage('Build & Deploy') {
            steps {
                sh 'ng build'
                sh 'docker build -t wizard-frontend .'
                sh 'docker image ls'
                sh 'docker run --name wizard-frontend-container -d -p 8081:80 wizard-frontend'
            }
        }
    }
}