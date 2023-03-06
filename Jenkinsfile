pipeline {
    agent {
        docker { image 'node:18.14.2-alpine3.16' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}