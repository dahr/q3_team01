node ('docker'){
  stage 'Checkout'
  checkout scm

  withDockerServer([uri: 'tcp://192.168.110.89:2376']) {
    stage 'Build Containers'
    sh 'docker-compose build'

    stage 'Start application'
    sh 'docker-compose up -d'
  }
}