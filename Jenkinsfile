node('docker') {
  stage 'Checkout'
  checkout scm
  env.OWNER = "team1"
  env.DOCKER_API_VERSION = "1.23"

  withDockerServer([uri: 'tcp://192.168.110.89:2376']) {
    stage 'Build Containers'
    sh 'docker-compose build'

    stage 'Stop and remove old deployment'
    sh 'docker-compose kill'
    sh 'docker-compose rm -af'

    stage 'Start application'
    sh 'docker-compose up -d --remove-orphans'


    stage 'Run Tests'
    sh 'sleep 60'
    sh 'testing-service/runtests.sh'
    sh "docker cp team1-testing-service:/home/app/TEST-Basic_Function_Suite.xml ."
    step([$class: 'JUnitResultArchiver', testResults: 'TEST-Basic_Function_Suite.xml'])
  }
}