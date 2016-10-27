#!/bin/bash



project_dir="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"


curl --form "project=@${project_dir}/Q3-Training-Tests-soapui-project.xml"  --form "suite=Basic Function Suite" http://192.168.110.89:3000
#curl --form "project=@${project_dir}/Q3-Training-Tests-soapui-project.xml"  --form "suite=Basic Function Suite" http://app.docna-team1.io:3000
#curl --form "project=@${project_dir}/Q3-Training-Tests-soapui-project.xml"  --form "suite=Basic Function Suite" http://172.16.78.129:3000
#curl --form "project=@${project_dir}/Q3-Training-Tests-soapui-project.xml"  --form "suite=Basic Function Suite" http://localhost:3000