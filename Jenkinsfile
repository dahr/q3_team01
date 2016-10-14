 node ('master'){
  dir('approval-service'){
    stage ('Build approval-service'){
      docker.build team
    }
  }

#  stage ('Run'){
#    sh 'docker-compose up -d'
#  }

}