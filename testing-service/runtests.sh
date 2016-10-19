#!/bin/bash



project_dir="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"


curl --form "project=@${project_dir}/Q3-Training-Tests-soapui-project.xml"  --form "suite=Basic Function Suite" http://localhost:3000l