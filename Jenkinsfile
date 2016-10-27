node {
  stage 'Checkout'
  checkout scm
  env.OWNER = "team1"

  stage 'Build Containers'
  sh 'docker-compose build'

  stage 'Stop and remove old deployment'
  sh 'docker-compose kill'
  sh 'docker-compose rm -af'

  stage 'Start application'
  sh 'docker-compose up -d --remove-orphans'


  stage 'Run Tests'
  sh 'testing-service/runtests.sh'
  sh "docker cp team1-testing-service:/home/app/TEST-Basic_Function_Suite.xml ."
  step([$class: 'JUnitResultArchiver', testResults: 'TEST-Basic_Function_Suite.xml'])

}