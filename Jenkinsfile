node ('docker'){
  stage 'Checkout'
  checkout scm
  env.OWNER = "team01"

  withDockerServer([uri: 'tcp://192.168.110.89:2376']) {
    stage 'Build Containers'
    sh 'docker-compose build'

    stage 'Start application'
    sh 'docker-compose up -d --remove-orphans'

    stage 'Run Tests'
    sh 'testing-service/runtests.sh'
  }
}