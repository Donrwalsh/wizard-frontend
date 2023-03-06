pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'ls'
                sh 'rm -rf node_modules'
                sh 'npm install --cache=".jenkins-npm-cache"'
                // sh 'npm run test-ci'
            }
        }
        stage('Build & Deploy') {
            steps {
                sh 'npm run build'
                sh 'docker build -t wizard-frontend .'
                sh 'docker image ls'
                sh 'docker stop wizard-frontend'
                sh 'docker remove wizard-frontend'
                sh 'docker run --name wizard-frontend-container -d -p 8081:80 wizard-frontend'
            }
        }
    }
}