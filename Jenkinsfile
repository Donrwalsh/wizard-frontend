pipeline {
    agent {
        docker { image 'node:18.14.2-alpine3.16' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'ls'
                sh 'rm -rf node_modules'
                sh 'npm install --cache=".jenkins-npm-cache"'
                sh 'npm run test-ci'
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