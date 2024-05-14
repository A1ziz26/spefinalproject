pipeline {
    agent any
    tools {
        maven 'maven' 
    }
    stages {
        stage('Git Pull') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/A1ziz26/spefinalproject']])
            }
        }
        stage('Build Maven') {
            steps {
                dir('spebackend') {
                    sh 'mvn clean install'
                }
            }
        }
        stage('Maven Test') {
            steps {
                dir('spebackend') {
                    sh 'mvn test'
                }
            }
        }
        stage('Build and Push Docker Image ') {
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, inventory: 'deploy/inventory',
                playbook: 'deploy/docker_deploy.yaml', sudoUser: null, vaultTmpPath: ''
            }
        }
        stage("Run Docker Compose") {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
