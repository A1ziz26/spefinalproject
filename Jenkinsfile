pipeline {
    agent any
    tools {
        maven 'maven' 
    }
    environment {
        VAULT_PASSWORD = credentials('ansible_vault_password')
    }
    stages {
        stage('Git Pull') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/A1ziz26/spefinalproject']])
            }
        }
        stage('Build') {
            steps {
                dir('spebackend') {
                    sh 'mvn clean install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('spebackend') {
                    sh 'mvn test'
                }
            }
        }
        stage('Contanerization') {
            steps {
                script {
                    ansiblePlaybook installation: 'Ansible', inventory: 'deploy/inventory', playbook: 'deploy/docker_build.yaml', vaultTmpPath: ''
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    dir('deploy'){
                        sh '''
                        #!/bin/bash
                        ansible-playbook your_playbook.yml --vault-password-file <(echo $VAULT_PASSWORD)
                    '''
                    }
                }
            }
        }
        stage("Start Services") {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
