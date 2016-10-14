 node ('master'){
  dir('approval-service'){
    stage ('Build approval-service'){
      docker.build team1-approval-service
    }
  }

#  stage ('Run'){
#    sh 'docker-compose up -d'
#  }

}