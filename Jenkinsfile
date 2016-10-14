 node ('docker'){
  stage ('Build'){
    docker-compose build
  }

  stage ('Run'){
    docker-compose up -d
  }

}