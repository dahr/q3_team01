 node ('docker'){
  stage ('Build'){
    sh 'docker-compose build'
  }

  stage ('Run'){
    sh 'docker-compose up -d'
  }

}