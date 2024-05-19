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
        stage('Build & Push Docker Images to DockerHub') {
            steps {
                script {
                    ansiblePlaybook installation: 'Ansible', inventory: 'deploy/inventory', playbook: 'deploy/docker_deploy.yaml', vaultTmpPath: ''
                }
            }
        }
        stage("Run Docker Compose") {
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}
