#!/bin/ash

echo Starting `hostname`

isok=`echo ruok | nc zookeeper-service 2181`

echo "Zookeeper is: $isok"

until [ "$isok" == "imok" ]; do
    echo `hostname` waiting for Zookeeper is ok $isok

    sleep 15

    isok=`echo ruok | nc zookeeper-service 2181`
    echo "Zookeeper is: $isok"
done


    sleep 30



exec $@